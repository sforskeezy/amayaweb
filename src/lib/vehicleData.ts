export const vehicleMakes = [
  "Acura", "Alfa Romeo", "Aston Martin", "Audi", "Bentley", "BMW", "Buick",
  "Cadillac", "Chevrolet", "Chrysler", "Dodge", "Ferrari", "Fiat", "Ford",
  "Genesis", "GMC", "Honda", "Hyundai", "Infiniti", "Jaguar", "Jeep", "Kia",
  "Lamborghini", "Land Rover", "Lexus", "Lincoln", "Maserati", "Mazda",
  "McLaren", "Mercedes-Benz", "Mini", "Mitsubishi", "Nissan", "Porsche",
  "RAM", "Rivian", "Rolls-Royce", "Subaru", "Tesla", "Toyota", "Volkswagen",
  "Volvo",
];

export const vehicleModels: Record<string, string[]> = {
  "Acura": ["ILX", "Integra", "MDX", "RDX", "TLX", "NSX"],
  "Alfa Romeo": ["Giulia", "Stelvio", "Tonale"],
  "Aston Martin": ["DB11", "DB12", "DBX", "Vantage"],
  "Audi": ["A3", "A4", "A5", "A6", "A7", "A8", "e-tron GT", "Q3", "Q4 e-tron", "Q5", "Q7", "Q8", "R8", "RS5", "RS7", "S4", "S5", "TT"],
  "Bentley": ["Bentayga", "Continental GT", "Flying Spur"],
  "BMW": ["2 Series", "3 Series", "4 Series", "5 Series", "7 Series", "8 Series", "i4", "i5", "i7", "iX", "M3", "M4", "M5", "X1", "X2", "X3", "X4", "X5", "X6", "X7", "Z4"],
  "Buick": ["Enclave", "Encore", "Encore GX", "Envision", "Envista"],
  "Cadillac": ["CT4", "CT5", "Escalade", "LYRIQ", "XT4", "XT5", "XT6"],
  "Chevrolet": ["Blazer", "Bolt", "Camaro", "Colorado", "Corvette", "Equinox", "Malibu", "Silverado 1500", "Silverado 2500HD", "Suburban", "Tahoe", "Trailblazer", "Traverse", "Trax"],
  "Chrysler": ["300", "Pacifica"],
  "Dodge": ["Challenger", "Charger", "Durango", "Hornet"],
  "Ferrari": ["296 GTB", "812", "F8", "Purosangue", "Roma", "SF90"],
  "Fiat": ["500X"],
  "Ford": ["Bronco", "Bronco Sport", "Edge", "Escape", "Expedition", "Explorer", "F-150", "F-250", "Maverick", "Mustang", "Mustang Mach-E", "Ranger"],
  "Genesis": ["G70", "G80", "G90", "GV60", "GV70", "GV80"],
  "GMC": ["Acadia", "Canyon", "Hummer EV", "Sierra 1500", "Sierra 2500HD", "Terrain", "Yukon"],
  "Honda": ["Accord", "Civic", "CR-V", "HR-V", "Odyssey", "Passport", "Pilot", "Ridgeline"],
  "Hyundai": ["Elantra", "Ioniq 5", "Ioniq 6", "Kona", "Palisade", "Santa Cruz", "Santa Fe", "Sonata", "Tucson", "Venue"],
  "Infiniti": ["Q50", "Q60", "QX50", "QX55", "QX60", "QX80"],
  "Jaguar": ["E-PACE", "F-PACE", "F-TYPE", "I-PACE", "XF"],
  "Jeep": ["Cherokee", "Compass", "Gladiator", "Grand Cherokee", "Grand Cherokee L", "Grand Wagoneer", "Renegade", "Wagoneer", "Wrangler"],
  "Kia": ["Carnival", "EV6", "EV9", "Forte", "K5", "Niro", "Rio", "Seltos", "Sorento", "Soul", "Sportage", "Stinger", "Telluride"],
  "Lamborghini": ["Huracán", "Revuelto", "Urus"],
  "Land Rover": ["Defender", "Discovery", "Discovery Sport", "Range Rover", "Range Rover Evoque", "Range Rover Sport", "Range Rover Velar"],
  "Lexus": ["ES", "GX", "IS", "LC", "LS", "LX", "NX", "RC", "RX", "RZ", "TX", "UX"],
  "Lincoln": ["Aviator", "Corsair", "Nautilus", "Navigator"],
  "Maserati": ["Ghibli", "GranTurismo", "Grecale", "Levante", "MC20", "Quattroporte"],
  "Mazda": ["CX-30", "CX-5", "CX-50", "CX-70", "CX-90", "Mazda3", "MX-5 Miata"],
  "McLaren": ["720S", "750S", "Artura", "GT"],
  "Mercedes-Benz": ["A-Class", "AMG GT", "C-Class", "CLA", "CLE", "E-Class", "EQB", "EQE", "EQS", "G-Class", "GLA", "GLB", "GLC", "GLE", "GLS", "S-Class", "SL"],
  "Mini": ["Clubman", "Convertible", "Countryman", "Hardtop"],
  "Mitsubishi": ["Eclipse Cross", "Mirage", "Outlander", "Outlander Sport"],
  "Nissan": ["Altima", "Ariya", "Frontier", "GT-R", "Kicks", "Leaf", "Maxima", "Murano", "Pathfinder", "Rogue", "Sentra", "Titan", "Versa", "Z"],
  "Porsche": ["718 Boxster", "718 Cayman", "911", "Cayenne", "Macan", "Panamera", "Taycan"],
  "RAM": ["1500", "2500", "3500", "ProMaster"],
  "Rivian": ["R1S", "R1T"],
  "Rolls-Royce": ["Cullinan", "Ghost", "Phantom", "Spectre", "Wraith"],
  "Subaru": ["Ascent", "BRZ", "Crosstrek", "Forester", "Impreza", "Legacy", "Outback", "Solterra", "WRX"],
  "Tesla": ["Cybertruck", "Model 3", "Model S", "Model X", "Model Y"],
  "Toyota": ["4Runner", "bZ4X", "Camry", "Corolla", "Corolla Cross", "GR86", "GR Supra", "Grand Highlander", "Highlander", "Land Cruiser", "Prius", "RAV4", "Sequoia", "Tacoma", "Tundra", "Venza"],
  "Volkswagen": ["Atlas", "Atlas Cross Sport", "Golf GTI", "Golf R", "ID.4", "Jetta", "Taos", "Tiguan"],
  "Volvo": ["C40 Recharge", "S60", "S90", "V60", "XC40", "XC60", "XC90"],
};

export function getYears(): number[] {
  const currentYear = new Date().getFullYear() + 1;
  const years: number[] = [];
  for (let y = currentYear; y >= 1990; y--) {
    years.push(y);
  }
  return years;
}

export function getVehicleImageUrl(make: string, model: string, year: string): string {
  const cleanMake = make.toLowerCase().replace(/\s+/g, "-");
  const cleanModel = model.toLowerCase().replace(/\s+/g, "-").replace(/[()]/g, "");
  return `https://cdn.imagin.studio/getimage?customer=img&make=${encodeURIComponent(cleanMake)}&modelFamily=${encodeURIComponent(cleanModel)}&modelYear=${encodeURIComponent(year)}&angle=01&width=600&zoomType=fullscreen`;
}
