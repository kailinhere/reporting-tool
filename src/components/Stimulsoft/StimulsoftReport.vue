<template>
  <div id="app">
    <div>
      <div id="designer"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { Stimulsoft } from 'stimulsoft-reports-js/Scripts/stimulsoft.blockly.editor';

export default defineComponent({
  setup() {
    onMounted(async () => {
      let options = new Stimulsoft.Designer.StiDesignerOptions();
      options.appearance.fullScreenMode = true;

      let designer = new Stimulsoft.Designer.StiDesigner(
        options,
        'StiDesigner',
        false
      );

      var dataSet = new Stimulsoft.System.Data.DataSet('Demo');
      dataSet.readJsonFile('Demo.json');

      var report = new Stimulsoft.Report.StiReport();

      report.regData('Demo', 'Demo', dataSet);

      report.dictionary.synchronize();

      designer.report = report;
      designer.renderHtml('designer');
    });
  },
});
</script>
