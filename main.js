/**
 * Autor: Peter Benko 7643-1690-1
 * Vygeneruje seznam zaměstnanců podle vstupu dtoIn.
 * @param {{count: number, age: {min: number, max: number}}} dtoIn Vstup s počtem zaměstnanců a věkovým rozmezím.
 * @returns {Array} Seznam vygenerovaných zaměstnanců.
 */
export function main(dtoIn) {
  const dtoOut = [];
  const nowMs = Date.now();

  for (let i = 0; i < dtoIn.count; i += 1) {
    dtoOut.push(generateEmployee(dtoIn, nowMs));
  }

  return dtoOut;
}

// Seznamy jmen a příjmení rozdělené podle pohlaví
const MALE_NAMES = [
  "Adam", "Aleš", "Daniel", "David", "Filip",
  "Jaroslav", "Jan", "Jiří", "Karel", "Martin",
  "Milan", "Miloš", "Ondřej", "Pavel", "Radek",
  "Stanislav", "Tomáš", "Viktor", "Vladimír", "Vojtěch",
  "Vratislav", "Zdeněk", "Šimon", "Štěpán", "Marek"
];

const FEMALE_NAMES = [
  "Alžběta", "Barbora", "Božena", "Denisa", "Eva",
  "Hana", "Helena", "Irena", "Ivana", "Jitka",
  "Kateřina", "Kristýna", "Lenka", "Lucie", "Magdaléna",
  "Marie", "Michaela", "Petra", "Radka", "Romana",
  "Simona", "Šárka", "Tereza", "Veronika", "Zdeňka"
];

const MALE_SURNAMES = [
  "Balog", "Bartoš", "Beneš", "Beran", "Doležal",
  "Dvořák", "Fiala", "Hájek", "Horák", "Hruška",
  "Jelínek", "Kadlec", "Král", "Krejčí", "Kříž",
  "Kučera", "Malý", "Marek", "Mareš", "Navrátil",
  "Němec", "Novák", "Novotný", "Polák", "Pospíšil"
];

const FEMALE_SURNAMES = [
  "Adamová", "Balogová", "Bartošová", "Benešová", "Beranová",
  "Doležalová", "Dvořáková", "Fialová", "Hájeková", "Horáková",
  "Hrušková", "Jelínková", "Kadlecová", "Králová", "Krejčíová",
  "Kučerová", "Malá", "Marešová", "Navrátilová", "Němcová",
  "Nováková", "Novotná", "Poláková", "Pospíšilová", "Procházková"
];

const WORKLOADS = [10, 20, 30, 40];
const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;

/**
 * Vrátí náhodnou položku z pole.
 * @param {Array} array
 * @returns {*}
 */
function getRandomItem(array) {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}

/**
 * Vygeneruje náhodný věk v intervalu <minAge, maxAge>.
 * @param {number} minAge
 * @param {number} maxAge
 * @returns {number}
 */
function getRandomAge(minAge, maxAge) {
  if (minAge === maxAge) {
    return minAge;
  }

  // Ošetření případu, kdy jsou minAge a maxAge zadány v opačném pořadí
  if (minAge > maxAge) {
    const tmp = minAge;
    minAge = maxAge;
    maxAge = tmp;
  }

  return minAge + Math.random() * (maxAge - minAge);
}

/**
 * Vygeneruje datum narození tak, aby věk byl v daném intervalu.
 * @param {number} minAge
 * @param {number} maxAge
 * @param {number} nowMs
 * @returns {string}
 */
function generateBirthdate(minAge, maxAge, nowMs) {
  const age = getRandomAge(minAge, maxAge);
  const diffMs = age * MS_PER_YEAR;
  const birthMs = nowMs - diffMs;
  return new Date(birthMs).toISOString();
}

/**
 * Vygeneruje jednoho zaměstnance.
 * @param {{age: {min: number, max: number}}} dtoIn
 * @param {number} nowMs
 * @returns {{gender: string, birthdate: string, name: string, surname: string, workload: number}}
 */
function generateEmployee(dtoIn, nowMs) {
  const minAge = dtoIn.age.min;
  const maxAge = dtoIn.age.max;

  const gender = Math.random() < 0.5 ? "male" : "female";

  const firstNames = gender === "male" ? MALE_NAMES : FEMALE_NAMES;
  const surnames = gender === "male" ? MALE_SURNAMES : FEMALE_SURNAMES;

  return {
    gender,
    birthdate: generateBirthdate(minAge, maxAge, nowMs),
    name: getRandomItem(firstNames),
    surname: getRandomItem(surnames),
    workload: getRandomItem(WORKLOADS)
  };
}
