export type IRFile = { title:string; href:string; kind:"pdf"|"webcast"|"deck"|"xlsx"; date:string; size?:string };
export type IRItem = { title:string; href:string; date:string; category?:string };
export type KPI = { label:string; value:string; footnote?:string };
export type Price = { symbol:string; currency:string; value:number; asOf:string };
