export interface IQuoteType {
  id: number
  alias: string
  N: string
  FT: string
  ST: string
  SN: string
  D: string // !!!
  CN: string
  RId: number
  CtN: string
  stakeTypes: IStakeGroupType[],
}

export interface IStakeGroupType {
  id: number,
  N: string,
  Groups: number[],
  stakes: IStakeType[],
}

export interface IStakeType {
  id: number,
  N: string,
  TN: string,
  SFN: string,
  Q: number,
  R: number,
  A?: number,
}

export default IQuoteType;