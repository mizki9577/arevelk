declare module 'mathjs' {
  declare function add(x: number[], y: number[]): number[];
  declare function atan2(y: number, x: number): number;
  declare function det(x: number[][]): number;
  declare function divide(x: number[], y: number): number[];
  declare function max(...xs: number[]): number;
  declare function min(...xs: number[]): number;
  declare function subtract(x: number[], y: number[]): number[];
  declare function sin(theta: number): number;
  declare function cos(theta: number): number;

  declare var PI: number;
}

declare module 'lodash' {
  declare function isEqual(a: any, b: any): bool;
  declare function pullAllWith(a: any, b: any[], c: (l: any, r: any) => bool): any;
  declare function sortBy<T>(collection: T[]): T[];
}

declare module 'jStat' {
  declare var jStat: {
    normal: {
      sample(mean: number, std: number): number;
    };
    uniform: {
      sample(a: number, b: number): number;
    };
  };
}

// vim: set ts=2 sw=2 et:
