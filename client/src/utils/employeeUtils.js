/**
 * Fusionne les employés du fichier JSON avec ceux du local storage.
 * @param {Array} jsonEmployees - Les employés du fichier JSON.
 * @param {Array} localEmployees - Les employés du local storage.
 * @returns {Array} Un tableau contenant tous les employés fusionnés et triés par date de naissance.
 */
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

/**
 * Filtre les employés en fonction de la recherche de l'utilisateur.
 * @param {Array} storedEmployees - Les employés à filtrer.
 * @param {string} searchQuery - La chaîne de recherche saisie par l'utilisateur.
 * @returns {Array} Un tableau contenant les employés filtrés en fonction de la recherche.
 */
export const filterEmployees = (storedEmployees, searchQuery) => {
  return storedEmployees.filter((employee) => {
    const fullName = `${employee.firstname} ${employee.lastname}`
    return fullName.toLowerCase().includes(searchQuery.toLowerCase())
  })
}

/**
 * Trie les employés en fonction de la colonne et de la direction de tri.
 * @param {Array} filteredEmployees - Les employés filtrés à trier.
 * @param {string} columnName - Le nom de la colonne utilisée pour le tri.
 * @param {string} sortDirection - La direction de tri ("asc" pour ascendant, "desc" pour descendant).
 * @param {string} sortedColumn - Le nom de la colonne sur laquelle les employés ont été triés précédemment.
 * @returns {Array} Un tableau contenant les employés triés en fonction des paramètres de tri.
 */
export const sortEmployees = (
  filteredEmployees,
  columnName,
  sortDirection,
  sortedColumn, // Add this parameter
) => {
  // Cloner et trier le tableau filtré
  const sorted = [...filteredEmployees]

  sorted.sort((a, b) => {
    if (columnName === "starter") {
      // Tri des dates de début (format : yyyy-mm-dd)
      const dateA = new Date(a[columnName])
      const dateB = new Date(b[columnName])
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA
    } else if (columnName === "birthdate") {
      // Tri des dates de naissance (format : yyyy-mm-dd)
      const dateA = a[columnName] ? new Date(a[columnName]) : null
      const dateB = b[columnName] ? new Date(b[columnName]) : null

      // Gérer les dates vides ou non définies
      if (!dateA) return sortDirection === "asc" ? -1 : 1
      if (!dateB) return sortDirection === "asc" ? 1 : -1

      return sortDirection === "asc" ? dateA - dateB : dateB - dateA
    } else {
      // Tri des chaînes de caractères (format : insensible à la casse)
      const aValue = a[columnName]?.toLowerCase()
      const bValue = b[columnName]?.toLowerCase()
      if (aValue < bValue) {
        return sortDirection === "asc" ? -1 : 1
      } else if (aValue > bValue) {
        return sortDirection === "asc" ? 1 : -1
      }
      return 0
    }
  })

  return sorted
}
