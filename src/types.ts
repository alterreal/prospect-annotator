export type BinaryChoice = 'yes' | 'no' | '';

export type Region = 'apex' | 'mid' | 'base' | '';
export type Side = 'left' | 'right' | '';
export type Zone = 'transition' | 'peripheral' | 'central' | 'anterior_fibromuscular_stroma' | '';
export type Section = 'anterior' | 'posterior_medial' | 'posterior_lateral' | 'posterior' | '';

export interface Sector {
  region: Region;
  side: Side;
  zone: Zone;
  section?: Section; // Only for TZ and PZ
}

export interface Lesion {
  id: number;
  pirads?: number;
  volume?: number;
  sectors: Sector[];
}

export interface LabelData {
  epe?: BinaryChoice;
  svi?: BinaryChoice;
  enlarged_lymph_nodes?: BinaryChoice;
  prostate_volume?: number;
  psa?: number;
  main_findings?: string;
  lesions: Lesion[];
}

