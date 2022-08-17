import { DistributionMethod, Label } from 'src/lib/scm';

export interface RoyaltySet {
  identifier: string;
  address?: string;
  royalty?: number;
}

export interface PayableValue {
  payToken: string;
  amount?: number;
}

export interface CreateFormData {
  // this template type define the type of contract
  // that will be generated during the process
  // and the protection metadata to bind within the .mpd file
  distributionMethod?: DistributionMethod;
  label?: Label;
  templateRaw?: string;

  // parties here are defined according to what has been set
  // in the RDF/XML template
  royalties: RoyaltySet[];
  salePrice?: PayableValue;

  // --- media
  mediaFile?: File;
  thumbnail?: File;

  // ---- metadata
  title?: string;
  description?: string;

  // automatically set when user is connected
  readonly author: string;
}
