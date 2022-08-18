import { uid } from '@elacity-js/lib';
import { id as sha3 } from '@ethersproject/hash';

/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-explicit-any */
const generateSmartContractSpecification = (contractObj: any) => {
  const mediaSC: any = {};

  // Identifier
  mediaSC.identifier = contractObj.identifier;

  // Parties
  mediaSC.parties = {};
  Object.keys(contractObj.parties).forEach((p) => {
    mediaSC.parties[p] = '';
  });

  // Deontic Expression
  mediaSC.deontics = {};
  Object.keys(contractObj.deontics).forEach((deonticId) => {
    const tmpDeontic = JSON.parse(
      JSON.stringify(contractObj.deontics[deonticId])
    );
    // Fill the deontic with actions
    tmpDeontic.act = JSON.parse(
      JSON.stringify(contractObj.actions[tmpDeontic.act])
    );
    if (tmpDeontic.act.impliesAlso !== undefined) {
      for (let i = 0; i < tmpDeontic.act.impliesAlso.length; i++) {
        tmpDeontic.act.impliesAlso[i] = JSON.parse(
          JSON.stringify(contractObj.actions[tmpDeontic.act.impliesAlso[i]])
        );
      }
    }
    // Fill the deontic with constraints
    if (tmpDeontic.constraints !== undefined) {
      for (let i = 0; i < tmpDeontic.constraints.length; i++) {
        tmpDeontic.constraints[i] = JSON.parse(
          JSON.stringify(contractObj.facts[tmpDeontic.constraints[i]])
        );
      }
    }
    mediaSC.deontics[deonticId] = {
      uri: JSON.stringify(tmpDeontic),
      receiver: contractObj.deontics[deonticId].actedBySubject,
    };
  });

  // Objects
  if (contractObj.objects !== undefined) {
    mediaSC.objects = {};
    Object.keys(contractObj.objects).forEach((objectId) => {
      mediaSC.objects[objectId] = {
        uri: JSON.stringify(contractObj.objects[objectId]),
        receiver:
          contractObj.objects[objectId].rightsOwners !== undefined
            ? contractObj.objects[objectId].rightsOwners[0]
            : undefined,
      };
    });
  }

  // Contracts relations
  if (contractObj.contractRelations !== undefined) {
    // TODO
  }

  // Income percentage
  mediaSC.incomePercentage = {};
  Object.keys(contractObj.actions).forEach((actId) => {
    const act = contractObj.actions[actId];
    if (act.type === 'Payment') {
      const actor = act.actedBy;
      const beneficiary = act.beneficiaries[0];

      /* if (act.amount !== undefined) {
        if (payTo[actor] === undefined) payTo[actor] = {};
        payTo[actor][beneficiary] = act.amount;
      } else */
      if (act.incomePercentage !== undefined) {
        if (mediaSC.incomePercentage[actor] === undefined) { mediaSC.incomePercentage[actor] = {}; }
        mediaSC.incomePercentage[actor][beneficiary] = act.incomePercentage;
      }
    }
  });

  contractObj.idRef = `cont-${uid()}`;

  // Content URI
  mediaSC.contentURI = JSON.stringify(contractObj);
  // Content hash
  mediaSC.hash = sha3(mediaSC.contentURI);

  return mediaSC;
};

export default generateSmartContractSpecification;
