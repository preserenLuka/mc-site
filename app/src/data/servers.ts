export type Modpack = {
  label: string;
  href: string;
};

export type Server = {
  id: number;
  title: string;
  address: string;
  modpacks?: Modpack[];
  Info?: string;
};

export const servers: Server[] = [
  {
    id: 1,
    title: "Forever World",
    address: "foreverwrld.madebyluka.com",
    modpacks: [
      {
        label: "Only essential",
        href: "/modpacks/Fwrld 1.21.8 - only essential 1.0.0.mrpack",
      },
      {
        label: "Enhanced",
        href: "/modpacks/Fwrld 1.21.8 - Enhanced 1.0.0.mrpack",
      },
    ],
    Info: "A never-ending world to explore and build.",
  },
];
