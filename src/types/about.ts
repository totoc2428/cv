export interface Translation {
  en_value: string;
  fr_value: string;
}

export interface About {
  name: string;
  firstName: string;
  introduction: Translation;
  about: Translation;
}
