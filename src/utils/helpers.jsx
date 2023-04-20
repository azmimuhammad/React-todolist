export const PriorityColor = (priority) => {
  switch (priority) {
    case "very-high":
      return "#ED4C5C"
    case "high":
      return "#F8A541"
    case "normal":
      return "#00A790"
    case "low":
      return "#428BC1"
    case "very-low":
      return "#8942C1"

    default:
      return "#fff"
  }
}
