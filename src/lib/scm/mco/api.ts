/* eslint-disable @typescript-eslint/no-unused-vars-experimental */
/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
import {
  RDFType, ContractGenerator, DistributionMethod, Label, ISmartContractSpecification,
} from '../common';
import sccGenerate from './scc.generator';
import download_biglabel from './templates/use-case-download-big-label';
import download_nolabel from './templates/video-download-no-label';
import download_smalllabel from './templates/use-case-download-small-label';
import stream_biglabel from './templates/use-case-stream-big-label';
import stream_nolabel from './templates/use-case-stream-no-label';
import stream_smalllabel from './templates/use-case-stream-small-label';

const templateMap = {
  [DistributionMethod.ON_DEMAND_STREAM]: {
    [Label.BIG]: stream_biglabel,
    [Label.INDIE]: stream_smalllabel,
    [Label.SELF]: stream_nolabel,
  },
  [DistributionMethod.DIGITAL_SALE]: {
    [Label.BIG]: download_biglabel,
    [Label.INDIE]: download_smalllabel,
    [Label.SELF]: download_nolabel,
  },
};

class MCOApi implements ContractGenerator<RDFType> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async generateContractualObjects(input: string): Promise<any> {
    const r = await fetch('https://scm.linkeddata.es/api/parser/mco', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: input,
    });

    return r.json();
  }

  /**
   * Generate a Smart Contract specification from a given RDF input.
   *
   * @todo: Implement this method, for now we will just return a dummy specification.
   *
   * @param input
   * @returns
   */
  async generateContractSpecification(input: string): Promise<ISmartContractSpecification> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const contractualObjects: {contracts?: any[]} = await this.generateContractualObjects(input);

    if (!contractualObjects || contractualObjects?.contracts?.length === 0) {
      return Promise.reject(new Error('No contractual object generated'));
    }

    return sccGenerate(contractualObjects.contracts[0]) as ISmartContractSpecification;
  }

  async loadTemplate(distribution: DistributionMethod, label: Label): Promise<RDFType> {
    const template = templateMap[distribution][label];
    return Promise.resolve(template);
  }
}

export default new MCOApi();
