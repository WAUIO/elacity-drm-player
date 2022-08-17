import { useState } from 'react';
import { IUploader, IFormTransformer } from '../../lib/uploader';
import { CreateFormData } from './types';

interface HandlerParams {
  uploader: IUploader;
}

export enum HandlerStatus {
  INITED = 'inited',
  UP_THUMBNAIL = 'uploading_thumbnail',
  UP_MEDIA = 'uploading_media',
  SUCCEED = 'succeed',
  FAILED = 'failed',
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
const toBase64 = (file: File): Promise<string | ArrayBuffer> => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    resolve(reader.result);
  };
  reader.onerror = (err) => {
    reject(err);
  };
});

const thumbnailTransformer: IFormTransformer<Pick<CreateFormData, 'thumbnail' | 'title'>> = {
  transform: async (payload: CreateFormData) => {
    const formData = new FormData();
    formData.append('image', payload.thumbnail);
    formData.append('title', payload.title);
    return formData;
  },
};

const mediaTransformer: IFormTransformer<Omit<CreateFormData, 'thumbnail'> & {thumbnail: string;}> = {
  transform: async (payload: Omit<CreateFormData, 'thumbnail'> & {thumbnail: string;}) => {
    const formData = new FormData();
    formData.append('image', payload.mediaFile);
    formData.append('thumbnailHash', payload.thumbnail);
    formData.append('title', payload.title);
    formData.append('description', payload.description);
    formData.append('author', payload.author);
    formData.append('price', payload.salePrice.amount.toString());
    formData.append('payToken', payload.salePrice.payToken);
    return formData;
  },
};

export default ({ uploader }: HandlerParams) => {
  const [status, setStatus] = useState<HandlerStatus>(null);
  const [outcome, setOutcome] = useState<string>(null);

  const handlePayload = async ({ thumbnail, title, ...payload }: CreateFormData) => {
    try {
      setStatus(HandlerStatus.INITED);

      // 1. upload thumbnail -> replace .thumnail with returned CID of the file
      const thumnailFormData = await thumbnailTransformer.transform({ thumbnail, title });
      setStatus(HandlerStatus.UP_THUMBNAIL);
      const response1 = await uploader.upload<{path: string}[]>(thumnailFormData, {
        headers: {
          'X-Target-Flow': 'ipfs',
        },
      });

      // 2. upload media file
      setStatus(HandlerStatus.UP_MEDIA);
      const mediaFormData = await mediaTransformer.transform({
        ...payload,
        title,
        thumbnail: response1[0].path,
      });
      const response2 = await uploader.upload<{path: string}[]>(mediaFormData, {
        headers: {
          'X-Target-Flow': 'dash,ipfs',
        },
      });

      console.log({ response1, response2 });

      setStatus(HandlerStatus.SUCCEED);
      setOutcome(response2[0].path);

      return response2;
    } catch (e) {
      setStatus(HandlerStatus.FAILED);
      return Promise.reject(e);
    }
  };

  return {
    status,
    handlePayload,
    outcome,
  };
};
