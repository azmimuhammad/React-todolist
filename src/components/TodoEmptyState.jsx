import EmptyTodo from "../assets/images/ListItemEmptyState.svg"

const ListItemEmptyState = () => {
  return (
    <div className="flex justify-center" data-cy="todo-empty-state">
      <img
        src={EmptyTodo}
        className="w-7/12 h-auto"
        alt="activity-empty-state"
      />
    </div>
  )
}

export default ListItemEmptyState
