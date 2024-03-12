<template>
  <div class="row q-ma-lg">
    <q-select
      v-model="selectedTheme"
      :options="options"
      label="Theme"
      class="col-2 q-mr-lg"
    />

    <q-btn
      @click="exportToCsv"
      label="Export to CSV"
      :color="selectedTheme.value == 'Dark' ? 'blue-grey-8' : 'blue-grey-2'"
      :text-color="selectedTheme.value == 'Dark' ? 'white' : 'blue-grey-10'"
    ></q-btn>
  </div>

  <!-- with pagination. Pagination & row dragging cannot used at same time -->
  <ag-grid-vue
    style="height: 500px; width: 100%"
    :class="
      selectedTheme.value == 'Dark' ? 'ag-theme-quartz-dark' : 'ag-theme-quartz'
    "
    :rowData="rowData"
    :pagination="true"
    @cell-value-changed="onCellValueChanged"
    @cell-clicked="onCellClicked"
    :rowSelection="rowSelection"
    :rowMultiSelectWithClick="true"
    :gridOptions="gridOptions"
    @grid-ready="onGridReady"
  >
  </ag-grid-vue>

  <!-- with row dragging -->
  <!-- <ag-grid-vue
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
    @grid-ready="onGridReady"
    :rowDragManaged="true"
    :rowDragMultiRow="true"
  >
  </ag-grid-vue> -->

  <ag-charts-vue :options="chartOptions" class="q-ma-xl"> </ag-charts-vue>
</template>

<script lang="ts">
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-quartz.css';
import { AgGridVue } from 'ag-grid-vue3';
import { ref, onMounted, watch } from 'vue';
import { AgChartsVue } from 'ag-charts-vue3';

export default {
  components: {
    AgGridVue,
    AgChartsVue,
  },
  setup() {
    const rowData = ref([]);

    const columnDefs = ref([
      { field: 'mission', rowDrag: true },
      {
        field: 'company',
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: ['Arianespace', 'ESA', 'General Dynamics', 'ILS', 'NASA'],
        },
      },
      { field: 'location' },
      { field: 'date' },
      {
        field: 'price',
        valueFormatter: (params) => {
          return '£' + params.value.toLocaleString();
        },
      },
      { field: 'successful' },
      { field: 'rocket' },
    ]);

    onMounted(async () => {
      rowData.value = await fetchData();
      console.log(rowData.value);
    });

    const fetchData = async () => {
      const response = await fetch(
        'https://www.ag-grid.com/example-assets/space-mission-data.json'
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
    };

    const gridApi = ref();
    const onGridReady = (params) => {
      gridApi.value = params.api;
    };

    const exportToCsv = () => {
      gridApi.value.exportDataAsCsv();
    };

    const selectedTheme = ref('Light');
    const options = [
      { label: 'Light', value: 'Light' },
      { label: 'Dark', value: 'Dark' },
    ];

    const chartOptions = ref({
      title: {
        text: 'Chart from Table Data',
      },

      data: [],
      // Series: Defines which chart type and data to use
      series: [{ type: 'bar', xKey: 'company', yKey: 'price' }],
    });

    watch(rowData, (newData) => {
      chartOptions.value.data = newData;
    });

    return {
      rowData,
      onCellValueChanged,
      onCellClicked,
      rowSelection: 'multiple',
      gridOptions,
      onGridReady,
      exportToCsv,

      selectedTheme,
      options,

      chartOptions,
    };
  },
};
</script>
