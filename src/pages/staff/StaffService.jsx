
import useStaffOrders from "../../hooks/useStaffOrders";
import PageTitle from "../../components/staff/PageTitle";
import KpiSection from "../../components/staff/KpiSection";
import FilterToolbar from "../../components/staff/FilterToolbar";
import TableGridView from "../../components/staff/TableGridView";
import TableSplitView from "../../components/staff/TableSplitView";
import PriorityView from "../../components/staff/PriorityView";
import StaffEmptyState from "../../components/staff/StaffEmptyState";
import ConfirmModal from "../../components/staff/ConfirmModal";
import ToastContainer from "../../components/staff/ToastContainer";
import StaffViewTabs from "../../components/staff/StaffViewTabs";
import { FILTERS } from "../../utils/staffConstants";

function StaffService() {
  const s = useStaffOrders();

  const resetSearch = () => {
    s.setKeyword("");
    s.setFilter(FILTERS.ALL);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="mx-auto w-full max-w-[1720px] px-4 py-6 sm:px-6 lg:px-8">
        <PageTitle
          lastUpdated={s.lastUpdated}
          refreshing={s.refreshing}
          onRefresh={s.refresh}
        />

        <StaffViewTabs
          layout={s.layout}
          onLayoutChange={s.setLayout}
        />

        <KpiSection kpis={s.kpis} />

        <FilterToolbar
          keyword={s.keyword}
          onKeywordChange={s.setKeyword}
          filter={s.filter}
          onFilterChange={s.setFilter}
          kpis={s.kpis}
        />

        {s.filtered.length === 0 ? (
          <StaffEmptyState onReset={resetSearch} />
        ) : s.layout === "grid" ? (
          <TableGridView
            tables={s.filtered}
            onConfirm={s.requestConfirm}
          />
        ) : s.layout === "split" ? (
          <TableSplitView
            tables={s.filtered}
            selectedTable={s.selectedTable}
            onSelect={s.setSelectedId}
            onConfirm={s.requestConfirm}
            onMarkAll={s.markAllServed}
          />
        ) : (
          <PriorityView
            tables={s.filtered}
            onConfirm={s.requestConfirm}
          />
        )}
      </div>

      <ConfirmModal
        pending={s.pending}
        onCancel={s.cancelConfirm}
        onConfirm={s.confirmDelivery}
      />

      <ToastContainer toasts={s.toasts} />
    </div>
  );
}

export default StaffService;
