import { faker } from '@faker-js/faker';
import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

import AppTasks from '../app-tasks';
import AppNewsUpdate from '../app-news-update';
import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';
import AppCurrentSubject from '../app-current-subject';
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
    const sub = localStorage.getItem('SUB');
    if (sub) {
      setSubject(sub);
    }
  }, []);

  useEffect(() => {
    fetch('http://localhost:5188/api/Dashboard/NewCustomers')
      .then((response) => response.json())
      .then((data) => {
        setNewUsers(data.total || data);
      })
      .catch((error) => {
        console.error('Error fetching new users:', error);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:5188/api/Dashboard/TotalSoldJewelry')
      .then((response) => response.json())
      .then((data) => {
        setRepeatCustomer(data.total || data);
      })
      .catch((error) => {
        console.error('Error fetching repeat customers:', error);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:5188/api/Dashboard/TotalCustomers')
      .then((response) => response.json())
      .then((data) => {
        setTotalCustomer(data.total || data);
      })
      .catch((error) => {
        console.error('Error fetching total customers:', error);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:5188/api/Dashboard/TotalRevenueAllTime')
      .then((response) => response.json())
      .then((data) => {
        setTotalRevenue(data.totalRevenue || data);
      })
      .catch((error) => {
        console.error('Error fetching total revenue:', error);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:5188/api/Dashboard/BestSellingJewelryTypes')
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((item) => ({
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
    fetch('http://localhost:5188/api/Dashboard/BestSellingJewelry')
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((item) => ({
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
                '2014',
                '2015',
                '2016',
                '2017',
                '2018',
                '2019',
                '2010',
                '2021',
                '2022',
                '2023',
                '2024',
              ],
              series: [
                // {
                //   name: 'Team A',
                //   type: 'line',
                //   fill: 'solid',
                //   data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                // },
                {
                  name: 'This Month',
                  type: 'line',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Last Month',
                  type: 'line',
                  fill: 'area',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
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
