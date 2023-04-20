import EmptyDashboard from "../assets/images/DashboardEmptyState.svg"

const DashboardEmptyState = () => {
  return (
    <div className="flex justify-center" data-cy="activity-empty-state">
      <img
        src={EmptyDashboard}
        className="w-7/12 h-auto"
        alt="activity-empty-state"
      />
    </div>
  )
}

export default DashboardEmptyState
