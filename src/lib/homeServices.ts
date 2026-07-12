export type HomeService = {
  id: string;
  name: string;
  description: string;
  from: number | null; // NGN, null = request quote
  response: string;
  areas: string;
  image: string;
  featured: boolean;
};

export const homeServices: HomeService[] = [
  {
    id: "house-cleaning",
    name: "House Cleaning",
    description: "Reliable weekly, fortnightly or one-off home cleaning by trained staff.",
    from: 15000,
    response: "Same day",
    areas: "Lagos mainland & island",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=70",
    featured: true,
  },
  {
    id: "deep-cleaning",
    name: "Deep Cleaning",
    description: "Top-to-bottom deep clean for move-in, move-out or seasonal resets.",
    from: 45000,
    response: "Within 24 hours",
    areas: "Lagos, Abuja",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=70",
    featured: true,
  },
  {
    id: "plumbing",
    name: "Plumbing",
    description: "Leaks, blocked drains, fixture installs and everything in between.",
    from: 8000,
    response: "Same day",
    areas: "Lagos, Abuja",
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=900&q=70",
    featured: true,
  },
  {
    id: "electrical",
    name: "Electrical Repairs",
    description: "Certified electricians for wiring, sockets, lighting and fault-finding.",
    from: 10000,
    response: "Same day",
    areas: "Lagos, Abuja",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=900&q=70",
    featured: true,
  },
  {
    id: "appliance-install",
    name: "Appliance Installation",
    description: "Safe setup for washing machines, cookers, dishwashers and more.",
    from: 12000,
    response: "Within 24 hours",
    areas: "Lagos",
    image: "https://images.unsplash.com/photo-1585659722983-3a681d0f88d3?auto=format&fit=crop&w=900&q=70",
    featured: false,
  },
  {
    id: "ac-service",
    name: "AC Installation & Servicing",
    description: "Split & window AC install, gas top-up, cleaning and diagnostics.",
    from: 15000,
    response: "Same day",
    areas: "Lagos, Abuja",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=900&q=70",
    featured: true,
  },
  {
    id: "furniture-assembly",
    name: "Furniture Assembly",
    description: "Flat-pack and custom furniture assembled quickly and correctly.",
    from: 7000,
    response: "Same day",
    areas: "Lagos",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=70",
    featured: false,
  },
  {
    id: "painting",
    name: "Painting",
    description: "Interior and exterior painting, patch-ups and full-room repaints.",
    from: null,
    response: "Quote in 24 hours",
    areas: "Lagos, Abuja",
    image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=900&q=70",
    featured: false,
  },
  {
    id: "home-repairs",
    name: "Home Repairs",
    description: "Fixes for doors, locks, tiles, ceilings and other everyday wear.",
    from: 6000,
    response: "Same day",
    areas: "Lagos",
    image: "https://images.unsplash.com/photo-1581091012184-7c15d21fd6da?auto=format&fit=crop&w=900&q=70",
    featured: false,
  },
  {
    id: "handyman",
    name: "Handyman Services",
    description: "One trusted person for a mix of small tasks around your home.",
    from: 8000,
    response: "Same day",
    areas: "Lagos",
    image: "https://images.unsplash.com/photo-1621905252189-9b28a3edc8b0?auto=format&fit=crop&w=900&q=70",
    featured: true,
  },
  {
    id: "gardening",
    name: "Gardening",
    description: "Lawn care, hedge trimming, planting and general garden upkeep.",
    from: 12000,
    response: "Within 48 hours",
    areas: "Lagos",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=70",
    featured: false,
  },
  {
    id: "pest-control",
    name: "Pest Control",
    description: "Safe, targeted treatment for rodents, roaches, mosquitoes and termites.",
    from: 20000,
    response: "Within 24 hours",
    areas: "Lagos, Abuja",
    image: "https://images.unsplash.com/photo-1632759145355-8b8f2a56d9d1?auto=format&fit=crop&w=900&q=70",
    featured: false,
  },
  {
    id: "tv-mounting",
    name: "TV Mounting",
    description: "Secure wall-mount installation with tidy cable management.",
    from: 10000,
    response: "Same day",
    areas: "Lagos",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=900&q=70",
    featured: true,
  },
  {
    id: "moving",
    name: "Moving Assistance",
    description: "Careful packing, loading and unloading — with the muscle to match.",
    from: null,
    response: "Quote in 24 hours",
    areas: "Lagos, Abuja",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=70",
    featured: false,
  },
  {
    id: "maintenance",
    name: "General Home Maintenance",
    description: "Scheduled upkeep so small issues never turn into big repairs.",
    from: null,
    response: "Quote in 24 hours",
    areas: "Lagos, Abuja",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=70",
    featured: false,
  },
];

export const WHATSAPP_NUMBER = "2348000000000"; // update in one place
export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
