// Fonction pour fusionner les employés du fichier JSON avec ceux du local storage
export const mergeEmployees = (jsonEmployees, localEmployees) => {
  let merged = [...jsonEmployees]
  if (localEmployees) {
    merged = merged.concat(localEmployees)
  }

  // Trier les employés par date de naissance (birthdate)
  merged.sort((a, b) => {
    const dateA = a.birthdate ? new Date(a.birthdate) : new Date("1970-01-01")
    const dateB = b.birthdate ? new Date(b.birthdate) : new Date("1970-01-01")
    return dateA - dateB
  })

  return merged
}

// Filtrer les employés en fonction de la recherche de l'utilisateur
export const filterEmployees = (storedEmployees, searchQuery) => {
  return storedEmployees.filter((employee) => {
    const fullName = `${employee.firstname} ${employee.lastname}`
    return fullName.toLowerCase().includes(searchQuery.toLowerCase())
  })
}

// Fonction pour trier les employés en fonction de la colonne et de la direction de tri
export const sortEmployees = (
  filteredEmployees,
  columnName,
  sortDirection,
  sortedColumn, // Add this parameter
) => {
  const newSortDirection =
    columnName === sortedColumn && sortDirection === "asc" ? "desc" : "asc"

  // Cloner et trier le tableau filtré
  const sorted = [...filteredEmployees]

  sorted.sort((a, b) => {
    if (columnName === "starter") {
      // Tri des dates de début (format : yyyy-mm-dd)
      const dateA = new Date(a[columnName])
      const dateB = new Date(b[columnName])
      return newSortDirection === "asc" ? dateA - dateB : dateB - dateA
    } else if (columnName === "birthdate") {
      // Tri des dates de naissance (format : yyyy-mm-dd)
      const dateA = a[columnName] ? new Date(a[columnName]) : null
      const dateB = b[columnName] ? new Date(b[columnName]) : null

      // Gérer les dates vides ou non définies
      if (!dateA) return newSortDirection === "asc" ? -1 : 1
      if (!dateB) return newSortDirection === "asc" ? 1 : -1

      return newSortDirection === "asc" ? dateA - dateB : dateB - dateA
    } else {
      // Tri des chaînes de caractères (format : insensible à la casse)
      const aValue = a[columnName]?.toLowerCase()
      const bValue = b[columnName]?.toLowerCase()
      if (aValue < bValue) {
        return newSortDirection === "asc" ? -1 : 1
      } else if (aValue > bValue) {
        return newSortDirection === "asc" ? 1 : -1
      }
      return 0
    }
  })

  return sorted
}
