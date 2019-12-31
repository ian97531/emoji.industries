export type IEmoji = {
  category: string;
  codepoints: ReadonlyArray<number>;
  name: string;
  familyName: string;
  familyMembers: ReadonlyArray<string>;
};
