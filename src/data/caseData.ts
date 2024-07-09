export const COLORS = [
  { label: "Black", value: "black", hex: "#18181B", tw: "border-zinc-900" },
  { label: "Red", value: "red", hex: "#450A0A", tw: "border-rose-900" },
  { label: "Blue", value: "blue", hex: "#172554", tw: "border-blue-900" },
] as const;

export const MODELS = {
  name: "models",
  variants: [
    {
      label: "iPhone X",
      value: "iphonex",
    },
    {
      label: "iPhone 11",
      value: "iphone11",
    },
    {
      label: "iPhone 12",
      value: "iphone12",
    },
    {
      label: "iPhone 13",
      value: "iphone13",
    },
    {
      label: "iPhone 14",
      value: "iphone14",
    },
    {
      label: "iPhone 15",
      value: "iphone15",
    },
  ],
} as const;

export const MATERIALS = {
  name: "material",
  variants: [
    {
      label: "Silicone",
      value: "silicone",
      description: undefined,
      price: 0,
    },
    {
      label: "Soft Polycarbonate",
      value: "polycarbonate",
      description: "Scratch-resistant coating",
      price: 5_00,
    },
  ],
} as const;

export const FINISHES = {
  name: "finish",
  variants: [
    {
      label: "Smooth Finish",
      value: "smooth",
      description: undefined,
      price: 0,
    },
    {
      label: "Textured Finish",
      value: "textured",
      description: "Soft grippy texture",
      price: 3_00,
    },
  ],
} as const;
