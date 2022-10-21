import React from 'react';
import { RoyaltySet } from 'src/lib/typeform/types';

interface PartyOption {
  KeyPressId: string;
  value: string;
}

interface Params {
  options: PartyOption[];
  values: RoyaltySet[];
  onComplete: (roylaties: RoyaltySet[], parties?: string[]) => void;
}

export const useRoyaltiesSetup = ({ options, values, onComplete }: Params) => {
  const [innerStep, setInnerStep] = React.useState<number>(1);
  const [parties, setParties] = React.useState<string[]>((values || []).map(({ key }) => key));
  const [royalties, setRoyalties] = React.useState<Record<string, RoyaltySet>>(
    Object.fromEntries((values || []).map(({ key, ...t }) => [key, { key, ...t }]))
  );

  const handleComplete = React.useCallback(
    () => {
      onComplete(Object.entries(royalties).map(
        ([partyKey, royalty]) => ({
          ...royalty,
          key: partyKey,
        })
      ), parties);
    }, [royalties, parties]
  );

  React.useEffect(() => {
    setRoyalties(
      (prev: Record<string, RoyaltySet>) => parties.reduce(
        (result: Record<string, RoyaltySet>, partyKey: string) => ({
          ...result,
          [partyKey]: prev[partyKey] || {
            identifier: options.find((o) => o.KeyPressId === partyKey)?.value,
            address: '',
            royalty: 0,
          },
        }), {}
      )
    );
  }, [parties]);

  const handleRoyaltyChange = (partyKey: string, prop: keyof RoyaltySet) => (
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setRoyalties(
        (prev: Record<string, RoyaltySet>) => ({
          ...prev,
          [partyKey]: {
            ...prev[partyKey],
            [prop]: e.target.value,
          },
        })
      );
    }
  );

  const handleSelectChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setParties(e.target.value);
  }, []);

  const handleNext = React.useCallback(() => {
    setInnerStep(
      (prev) => prev + 1
    );
  }, [parties]);

  const handlePrev = React.useCallback(() => {
    setInnerStep(
      (prev) => prev - 1
    );
  }, [parties]);

  return {
    handleSelectChange,
    handleRoyaltyChange,
    handleComplete,
    handleNext,
    handlePrev,
    innerStep,
    parties,
    royalties,
  };
};
