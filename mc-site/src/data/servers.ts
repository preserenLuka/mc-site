export type Server = {
  id: number;
  title: string;
  address: string;
  download?: string;
};

export const servers: Server[] = [
  {
    id: 1,
    title: "Survival Realm",
    address: "play.survival.example:25565",
    download: "https://modrinth.com/example-modpack.zip",
  },
  {
    id: 2,
    title: "Creative Hub",
    address: "creative.example.net",
    download: "#",
  },
];
