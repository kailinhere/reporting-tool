<template>
  <div id="designer-host"></div>

  <div class="text-center">
    <h2 class="title">REPORT VIEWER</h2>
  </div>
  <div id="viewer-host"></div>
</template>

<script>
export default {
  mounted() {
    const designer = new GC.ActiveReports.ReportDesigner.Designer(
      '#designer-host'
    );

    const dataSource = {
      Name: 'DataSource',
      ConnectionProperties: {
        DataProvider: 'JSON',
        ConnectString:
          'endpoint=https://www.ag-grid.com/example-assets/olympic-winners.json',
      },
    };

    const winnerDataSet = {
      Name: 'DataSet',
      Query: {
        DataSourceName: 'DataSource',
        CommandText: 'jpath=$.[*]',
      },
      Fields: [
        { Name: 'athlete', DataField: 'athlete' },
        { Name: 'age', DataField: 'age' },
        { Name: 'country', DataField: 'country' },
        { Name: 'year', DataField: 'year' },
        { Name: 'date', DataField: 'date' },
        { Name: 'sport', DataField: 'sport' },
        { Name: 'gold', DataField: 'gold' },
        { Name: 'silver', DataField: 'silver' },
        { Name: 'bronze', DataField: 'bronze' },
        { Name: 'total', DataField: 'total' },
      ],
    };

    designer.setDataSourceTemplates([
      {
        id: 'DataSource',
        title: 'DataSource',
        template: dataSource,
        canEdit: false,
        datasets: [
          {
            id: 'DataSet',
            title: 'DataSet',
            template: winnerDataSet,
            canEdit: false,
          },
        ],
      },
    ]);

    var viewer = new ActiveReports.Viewer('#viewer-host');
    viewer.open('report.rdlx-json');
  },
};
</script>

<style lang="sass">
#designer-host, #viewer-host
  width: 100%
  height: 100vh

.title
  background: linear-gradient(to right, $brown-10, $brown-4)
  background-clip: text
  color: transparent
  display: inline-block
  font-weight: 900
  font-style: italic
</style>
