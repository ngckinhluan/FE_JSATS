import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import axiosInstance from 'src/utils/axiosInstance';
import AppWidgetSummary from '../app-widget-summary';
import AppWebsiteVisits from '../app-website-visits';
import AppCurrentVisits from '../app-current-visits';
import AppConversionRates from '../app-conversion-rates';

// ----------------------------------------------------------------------

export default function AppView() {
  const [subject, setSubject] = useState('');
  const [newUsers, setNewUsers] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [repeatCustomer, setRepeatCustomer] = useState(0);
  const [totalCustomer, setTotalCustomer] = useState(0);
  const [jewelrySales, setJewelrySales] = useState([]);
  const [jewelrySalesTypes, setJewelrySalesTypes] = useState([]);

  useEffect(() => {
    const sub = localStorage.getItem('sub');
    if (sub) {
      setSubject(sub);
    }
  }, []);

  useEffect(() => {
    axiosInstance
      .get('/Dashboard/NewCustomers')
      .then((response) => {
        setNewUsers(response.data.total || response.data);
      })
      .catch((error) => {
        console.error('Error fetching new users:', error);
      });
  }, []);

  useEffect(() => {
    axiosInstance
      .get('/Dashboard/TotalSoldJewelry')
      .then((response) => {
        setRepeatCustomer(response.data.total || response.data);
      })
      .catch((error) => {
        console.error('Error fetching repeat customers:', error);
      });
  }, []);

  useEffect(() => {
    axiosInstance
      .get('/Dashboard/TotalCustomers')
      .then((response) => {
        setTotalCustomer(response.data.total || response.data);
      })
      .catch((error) => {
        console.error('Error fetching total customers:', error);
      });
  }, []);

  useEffect(() => {
    axiosInstance
      .get('/Dashboard/TotalRevenueAllTime')
      .then((response) => {
        setTotalRevenue(response.data.totalRevenue || response.data);
      })
      .catch((error) => {
        console.error('Error fetching total revenue:', error);
      });
  }, []);

  useEffect(() => {
    axiosInstance
      .get('/Dashboard/BestSellingJewelryTypes')
      .then((response) => {
        const formattedData = response.data.map((item) => ({
          label: item.jewelryTypeName,
          value: item.purchaseTime,
        }));
        setJewelrySales(formattedData);
      })
      .catch((error) => {
        console.error('Error fetching jewelry sales types:', error);
      });
  }, []);

  useEffect(() => {
    axiosInstance
      .get('/Dashboard/BestSellingJewelry')
      .then((response) => {
        const formattedData = response.data.map((item) => ({
          label: item.jewelryName,
          value: item.purchaseTime,
        }));
        setJewelrySalesTypes(formattedData);
      })
      .catch((error) => {
        console.error('Error fetching jewelry sales:', error);
      });
  }, []);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋 {subject}
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Revenues"
            total={totalRevenue}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="All Customers"
            total={totalCustomer}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="New Customers"
            total={newUsers}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Jewelries Sold"
            total={repeatCustomer}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Customers"
            chart={{
              labels: [
                '1',
                '2',
                '3',
                '4',
                '5',
              ],
              series: [
                {
                  name: 'This Month',
                  type: 'line',
                  fill: 'gradient',
                  data: [5, 3, 9, 2, 1],
                },
                {
                  name: 'Last Month',
                  type: 'line',
                  fill: 'area',
                  data: [6, 8, 3, 2, 7],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Jewelry Sales Type"
            chart={{
              series: jewelrySales,
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Best Selling Items"
            chart={{
              series: jewelrySalesTypes,
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
