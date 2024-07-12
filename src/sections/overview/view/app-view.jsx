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

// This is my api http://localhost:5188/api/Dashboard/NewCustomers returns the number of
// customer, how can I pour it into the new users?
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
        console.error('Error fetching new users:', error);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:5188/api/Dashboard/TotalCustomers')
      .then((response) => response.json())
      .then((data) => {
        setTotalCustomer(data.total || data);
      })
      .catch((error) => {
        console.error('Error fetching new users:', error);
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
        console.error('Error fetching jewelry sales:', error);
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

        {/* <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Bug Reports"
            total={234}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid> */}

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
                //   name: 'This Week',
                //   type: 'line',
                //   fill: 'area',
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

        {/* <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Current Subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [100, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid> */}
{/* 
        <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="News Update"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Order Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                '1983, orders, $4220',
                '12 Invoices have been paid',
                'Order #37745 from September',
                'New order placed #XF-2356',
                'New order placed #XF-2346',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Traffic by Site"
            list={[
              {
                name: 'FaceBook',
                value: 323234,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                value: 341212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: 443232,
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Create FireStone Logo' },
              { id: '2', name: 'Add SCSS and JS files if required' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          />
        </Grid> */}
      </Grid>
    </Container>
  );
}
