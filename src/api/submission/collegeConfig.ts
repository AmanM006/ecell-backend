export const ALLOWED_COLLEGES = [
  "MIT Manipal",
  "MAHE Manipal",
  "KMC Manipal",
  "MCODS Manipal",
  "Manipal College of Nursing",
  "Welcomgroup Graduate School of Hotel Administration",
  "Manipal Academy of Banking",
  "Manipal Institute of Technology Bengaluru",
] as const;

// TODO update college list

export type AllowedCollege = (typeof ALLOWED_COLLEGES)[number];

export const isValidCollege = (college: string): college is AllowedCollege => {
  return (ALLOWED_COLLEGES as readonly string[]).includes(college);
};
