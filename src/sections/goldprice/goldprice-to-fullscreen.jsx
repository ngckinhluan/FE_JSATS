import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const FullScreenBox = styled(Box)(({ theme }) => ({
    '&.fullscreen': {
        backgroundColor: 'white',
        width: '100%',
        height: '100vh',
        overflow: 'auto',
    },
}));

export default function GoldPricesTable() {
    const [rows, setRows] = useState([]);
    const navigate = useNavigate(); // Initialize navigate function

    useEffect(() => {
        fetch('http://localhost:5188/api/Price/GetGoldPrices')
            .then(response => response.json())
            .then(data => setRows(data))
            .catch(error => console.error('Error fetching data:', error));

        const fullScreenElement = document.getElementById('fullscreen-table');
        if (fullScreenElement.requestFullscreen) {
            fullScreenElement.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        }

        document.addEventListener('fullscreenchange', handleFullScreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullScreenChange);
        };
    }, []);

    const handleFullScreenChange = () => {
        const isFullScreen = document.fullscreenElement != null;
        const navElements = document.querySelectorAll('nav, header, footer');
        navElements.forEach(elem => {
            elem.style.display = isFullScreen ? 'none' : '';
        });

        const fullScreenElement = document.getElementById('fullscreen-table');
        if (isFullScreen) {
            fullScreenElement.classList.add('fullscreen');
        } else {
            fullScreenElement.classList.remove('fullscreen');
            navigate('/goldprice'); // Navigate when exiting full screen
        }
    };

    const handleFullscreenClick = () => {
        const fullScreenElement = document.getElementById('fullscreen-table');
        if (fullScreenElement.requestFullscreen) {
            fullScreenElement.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        }
    };

    const handleClose = () => {
        document.exitFullscreen().then(() => {
            navigate('/goldprice'); // Navigate when clicking 'X'
        }).catch(err => {
            console.log(`Error attempting to exit full-screen mode: ${err.message} (${err.name})`);
        });
    };

    return (
        <FullScreenBox id="fullscreen-table">
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} sx={{ marginTop: '20px' }}>
                <Typography variant="h4" sx={{ marginLeft: '10px' }}>Gold Price</Typography>
                <Button variant="contained" color="inherit" onClick={handleClose} sx={{ marginRight: '30px' }}>
                    X
                </Button>
            </Stack>
            <TableContainer component={Paper} sx={{ marginTop: '20px', borderRadius: '0px' }}>
                <Table sx={{ minWidth: 650, borderCollapse: 'collapse' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ border: '1px solid black', borderRadius: '0px' }}>Type</TableCell>
                            <TableCell sx={{ border: '1px solid black', borderRadius: '0px' }}>City</TableCell>
                            <TableCell align="right" sx={{ border: '1px solid black', borderRadius: '0px' }}>Buy Price</TableCell>
                            <TableCell align="right" sx={{ border: '1px solid black', borderRadius: '0px' }}>Sell Price</TableCell>
                            <TableCell sx={{ border: '1px solid black', borderRadius: '0px' }}>Last Updated</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={row.goldId}>
                                <TableCell sx={{ border: '1px solid black', borderRadius: '0px' }}>{row.type}</TableCell>
                                <TableCell sx={{ border: '1px solid black', borderRadius: '0px' }}>{row.city}</TableCell>
                                <TableCell align="right" sx={{ border: '1px solid black', borderRadius: '0px' }}>{row.buyPrice} triệu VnĐ</TableCell>
                                <TableCell align="right" sx={{ border: '1px solid black', borderRadius: '0px' }}>{row.sellPrice} triệu VnĐ </TableCell>
                                <TableCell sx={{ border: '1px solid black', borderRadius: '0px' }}>{new Date(row.lastUpdated).toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </FullScreenBox>
    );
}
