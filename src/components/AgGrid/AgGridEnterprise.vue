<!-- https://www.ag-grid.com/vue-data-grid/integrated-charts-installation/ -->
<template>
  <div class="row q-ma-lg">
    <q-select
      v-model="selectedTheme"
      :options="options"
      label="Theme"
      class="col-2 q-mr-lg"
    />
  </div>

  <!-- with pagination. Pagination & row dragging cannot used at same time -->
  <ag-grid-vue
    style="height: 500px; width: 100%"
    :class="
      selectedTheme.value == 'Dark' ? 'ag-theme-quartz-dark' : 'ag-theme-quartz'
    "
    :rowData="rowData"
    @cell-value-changed="onCellValueChanged"
    @cell-clicked="onCellClicked"
    :rowSelection="rowSelection"
    :rowMultiSelectWithClick="true"
    :gridOptions="gridOptions"
    :rowDragManaged="true"
    :rowDragMultiRow="true"
    :rowGroupPanelShow="rowGroupPanelShow"
    :groupIncludeTotalFooter="true"
    :groupIncludeFooter="groupIncludeFooter"
    :groupDefaultExpanded="groupDefaultExpanded"
    :autoGroupColumnDef="autoGroupColumnDef"
    :sideBar="true"
    :enableCharts="true"
    :enableRangeSelection="true"
  >
  </ag-grid-vue>
</template>

<script lang="ts">
import 'ag-grid-enterprise';
import 'ag-grid-enterprise/styles//ag-grid.css';
import 'ag-grid-enterprise/styles//ag-theme-quartz.css';
import { AgGridVue } from 'ag-grid-vue3';
import { ref, onMounted, onBeforeMount } from 'vue';
import 'ag-grid-charts-enterprise';

export default {
  components: {
    AgGridVue,
  },
  setup() {
    const rowData = ref([]);

    const columnDefs = ref([
      { field: 'country', rowDrag: true, enableRowGroup: true },
      {
        field: 'year',
        enableRowGroup: true,
        pivot: true,
        chartDataType: 'category',
      },
      { field: 'athlete' },
      { field: 'sport', enableRowGroup: true },
      { field: 'gold', aggFunc: 'sum', filter: 'agNumberColumnFilter' },
      { field: 'silver', aggFunc: 'sum' },
      { field: 'bronze', aggFunc: 'sum' },
    ]);

    onMounted(async () => {
      rowData.value = await fetchData();
      console.log(rowData.value);
    });

    const fetchData = async () => {
      const response = await fetch(
        'https://www.ag-grid.com/example-assets/olympic-winners.json'
      );
      return response.json();
    };

    const defaultColDef = ref({
      filter: true,
      floatingFilter: true,
      editable: true,
      resizable: true,
      sortable: true,
    });

    const onCellValueChanged = (event) => {
      console.log(`New Cell Value: ${event.value}`);
    };

    const onCellClicked = (event) => {
      console.log(`Cell Value: ${event.value}`);
    };

    const gridOptions = {
      columnDefs: columnDefs.value,
      defaultColDef: defaultColDef.value,
      animateRows: true,
      undoRedoCellEditing: 'true',
      undoRedoCellEditingLimit: '20',
      enableCellChangeFlash: 'true',
      enableRangeSelection: true,
    };

    const selectedTheme = ref('Light');
    const options = [
      { label: 'Light', value: 'Light' },
      { label: 'Dark', value: 'Dark' },
    ];

    const autoGroupColumnDef = ref(null);
    const groupIncludeFooter = ref(true);
    const groupDefaultExpanded = ref(1);
    onBeforeMount(() => {
      autoGroupColumnDef.value = {
        minWidth: 300,
        cellRendererParams: {
          footerValueGetter: (params) => {
            const isRootLevel = params.node.level === -1;
            if (isRootLevel) {
              return 'Grand Total';
            }
            return `Sub Total (${params.value})`;
          },
        },
      };

      groupIncludeFooter.value = (params) => {
        const node = params.node;
        if (!node || !node.rowGroupColumn) {
          return false;
        }
        return node.rowGroupColumn.getId() === 'country';
      };
      groupDefaultExpanded.value = 0;
    });

    return {
      rowData,
      onCellValueChanged,
      onCellClicked,
      rowSelection: 'multiple',
      gridOptions,
      rowGroupPanelShow: 'always',
      groupIncludeFooter,
      groupDefaultExpanded,
      autoGroupColumnDef,

      selectedTheme,
      options,
    };
  },
};
</script>
