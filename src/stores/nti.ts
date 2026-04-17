// bude sa este dorabat:))

import { defineStore } from "pinia";
import { ref } from "vue";

export interface Stat {
  val: string;
  label: string;
}

export interface Program {
  id: "A" | "B";
  badge: string;
  title: string;
  desc: string;
  checks: string[];
  tags: string[];
  btnLabel: string;
  route: string;
}

export interface Pillar {
  name: string;
  desc: string;
  svgPath: string;
}

export interface Step {
  title: string;
  desc: string;
}

export interface Partner {
  name: string;
}

export const useNtiStore = defineStore("nti", () => {
  const stats = ref<Stat[]>([
    { val: "2", label: "Aktívne programy" },
    { val: "4×", label: "Hodnotenie ročne" },
    { val: "3+", label: "Min. veľkosť tímu" },
    { val: "100%", label: "Reálne projekty" },
  ]);

  const programs = ref<Program[]>([
    {
      id: "A",
      badge: "Program A",
      title: "Grantový inkubačný program",
      desc: "Máš vlastný nápad, ktorý chceš premeniť na produkt? Program A ti poskytne grant, mentora a ekosystém, ktorý ťa prevedie od konceptu po realitu.",
      checks: [
        "Vlastný inovatívny nápad alebo tím",
        "Grantová podpora a financovanie projektu",
        "Priradený mentor z NTI ekosystému",
        "Výstupom je startup alebo produkt",
      ],
      tags: ["AI", "Web", "Mobile", "IoT", "Hry", "Dáta", "Embedded"],
      btnLabel: "Prihlásiť sa do Programu A",
      route: "/program-a",
    },
    {
      id: "B",
      badge: "Program B",
      title: "Živá prax z reálnych projektov",
      desc: "Pracuj na reálnom zadaní od firmy v tíme, zarob odmenu a nadobudni skúsenosti, na ktoré zamestnávatelia čakajú.",
      checks: [
        "Reálne zadanie od firmy z backlogu",
        "Výber tímu komisiou aj zástupcom firmy",
        "Product Owner za firmu + NTI mentor",
        "Odmena a zákazkový softvér ako výstup",
      ],
      tags: ["Laravel", "Vue.js", "React", "Java", "Python", "DevOps"],
      btnLabel: "Prihlásiť sa do Programu B",
      route: "/program-b",
    },
  ]);

  const pillars = ref<Pillar[]>([
    {
      name: "Inkubácia",
      desc: "Podporujeme vznik startupov a produktov s medzinárodným potenciálom.",
      svgPath:
        "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18",
    },
    {
      name: "Partnerstvá",
      desc: "Prepájame firmy, mentory a akademickú sféru v jednom ekosystéme.",
      svgPath:
        "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0",
    },
    {
      name: "Mentoring",
      desc: "Každý projekt má skúseného mentora a prístup ku pravidelným konzultáciám.",
      svgPath:
        "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
    },
    {
      name: "Retencia",
      desc: "Budujeme komunitu absolventov a talentov, ktorí zostávajú v regióne.",
      svgPath:
        "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
  ]);

  const steps = ref<Step[]>([
    {
      title: "Registrácia",
      desc: "Vytvoríš si účet a vyplníš profil — ako študent, tím alebo firma.",
    },
    {
      title: "Prihláška",
      desc: "Vybereš program, vypracuješ projekt a odošleš prihlášku s prílohami.",
    },
    {
      title: "Hodnotenie",
      desc: "Komisia posúdi prihlášku, prípadne vyžiada doplnenie, a rozhodne o prijatí.",
    },
    {
      title: "Realizácia",
      desc: "Pracuješ na projekte s prideleným mentorom a eviduješ míľniky.",
    },
    {
      title: "Odovzdanie",
      desc: "Výstupy sa archivujú, vyhodnotia KPI a projekt je uzavretý.",
    },
  ]);

  const partners = ref<Partner[]>([
    { name: "UKF Nitra" },
    { name: "SPU Nitra" },
    { name: "NITT SK" },
    { name: "IT Valley" },
    { name: "Krajský úrad" },
    { name: "Slovak IT" },
    { name: "Tech4Region" },
    { name: "StartupHub SK" },
  ]);

  return { stats, programs, pillars, steps, partners };
});
