export const services = [
  {
    id: "tech",
    number: "01",
    title: "Tech & Appliance Help",
    tagline: "Setup, installs, and everyday troubleshooting.",
    description:
      "From mounting a TV to setting up your Wi-Fi, smart plugs, printers or a new washing machine — we handle the fiddly bits so you don't have to.",
    examples: ["Wi-Fi & smart home setup", "TV wall mounting", "Appliance installation", "Device troubleshooting"],
    from: 25,
  },
  {
    id: "home",
    number: "02",
    title: "Home Tasks",
    tagline: "Small jobs around the house, done properly.",
    description:
      "Furniture assembly, minor repairs, help with moving day, errands and the odd chore that keeps slipping down your list.",
    examples: ["Furniture assembly", "Minor repairs", "Moving help", "Errand running"],
    from: 30,
  },
  {
    id: "barbing",
    number: "03",
    title: "Barbing & Grooming",
    tagline: "A sharp cut, at your door.",
    description:
      "Home-visit barbing for men and kids — classic cuts, fades, beard trims and grooming, all with clean tools and honest prices.",
    examples: ["Classic haircut", "Skin fade", "Beard trim & lineup", "Kids' cuts"],
    from: 20,
  },
  {
    id: "goods",
    number: "04",
    title: "Everyday Goods",
    tagline: "Small products, delivered locally.",
    description:
      "A curated selection of the household basics we get asked about most — cleaning kits, small tools, grooming essentials and more.",
    examples: ["Cleaning kits", "Basic tools", "Grooming kits", "Household refills"],
    from: 5,
  },
] as const;

export type Service = (typeof services)[number];
