interface FormProps {
  name: string;
  email: string;
  phone: string;
  plan: Plan;
  addons: Addon[];
}

interface Plan {
  type: string;
  price: number;
  billing: boolean;
}

interface Addon {
  type: "Online service" | "Larger storage" | "Customizable profile";
  price: number;
  selected: boolean;
}
