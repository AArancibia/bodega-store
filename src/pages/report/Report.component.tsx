import React, {useEffect, useState} from 'react';
import AreaChartComponent from "../../components/chart/area-chart/area-chart.component";
import './Report.component.styles.scss';
import {Select} from "antd";
import {connect} from "react-redux";
import {fetchSaleReportStart} from "../../redux/sale/sale.actions";
import {createStructuredSelector} from "reselect";
import {selectAnnualSaleReport} from "../../redux/sale/sale.selector";
import {ReportSale} from "../../interfaces/ReportSale";
import {saleReportAnnual} from "../../data/rest/sale.service";

interface Props {
  fetchSaleReport: () => void;
}

const ReportPage = ({fetchSaleReport}: Props) => {

  const [report, setReport] = useState<Array<ReportSale>>([]);
  const [year, setYear] = useState<string>('');
  const [years, setYears] = useState<Array<string>>([]);

  const getReport = async () => {
    const annualSaleReport = await saleReportAnnual() as Array<ReportSale>;
    setReport(annualSaleReport);
    const years = annualSaleReport.map(x => x.year);
    setYears(years);
    setYear(years[0]);
  }

  useEffect(() => {
    getReport();
  }, []);

  const handleChange = (year: string) => {
    setYear(year);
  }

  return (
    <div className="report">
      <h1 className="report__title">Reporte de Venta</h1>

      <div className="report__year flex-nowrap justify-content-center">
        <Select value={year} style={{ width: 120 }} onChange={handleChange}>
          {
            years.map(x => (
                <Select.Option value={x} >{x}</Select.Option>
            ))
          }
        </Select>
      </div>

      <div className="report__chart flex-nowrap justify-content-center">
        {
          report && <AreaChartComponent report={report} year={year} />
        }
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  annualSaleReport: selectAnnualSaleReport
})

const mapDispatchToProps = (dispatch: any) => ({
  fetchSaleReport: () => dispatch(fetchSaleReportStart()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ReportPage);
