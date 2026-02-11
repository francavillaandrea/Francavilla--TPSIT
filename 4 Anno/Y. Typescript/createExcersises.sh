#!/bin/bash

# Array con i nomi degli esercizi
exercises=(
  "VariabiliTipizzate"
  "FunzioniTipizzate"
  "OggettiTipizzati"
  "TypeVsInterface"
  "UnionTypes"
  "OptionalProperties"
  "LiteralTypes"
  "GenericsBase"
  "ArrayDiOggettiTipizzati"
  "AsyncPost"
  "AsyncErrorHandling"
  "PartialPick"
  "TypeGuards"
)

# Ciclo per creare le cartelle e i file index.ts
for i in "${!exercises[@]}"; do
  num=$(($i + 1))
  # Aggiunge lo zero davanti se il numero è <= 9
  if [ $num -le 9 ]; then
    num="0$num"
  fi
  folder="$num.${exercises[$i]}"
  mkdir -p "$folder"
  touch "$folder/index.ts"
  echo "// Esercizio $num - ${exercises[$i]}" > "$folder/index.ts"
done

echo "Tutte le cartelle degli esercizi sono state create con index.ts all'interno."
