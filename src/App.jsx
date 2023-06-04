import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const options = [
  {
    id: 1,
    label: (isVisible) => (
      <>
        {isVisible ? <VisibilityOffIcon /> : <VisibilityIcon />} {isVisible ? 'Ocultar' : 'Exibir'}
      </>
    ),
    icon: (isVisible) => (isVisible ? <VisibilityIcon /> : <VisibilityOffIcon />),
    action: (index, setData, handleClose) => {
      setData((prevData) => {
        const updatedData = [...prevData];
        updatedData[index].isVisible = !updatedData[index].isVisible;
        return updatedData;
      });
      handleClose();
    },
  },
];

const CustomTable = () => {
  const initialData = [
    { elementName: 'Elemento 1', content: 'Conteúdo 1', status: 'Ativo', isVisible: true, menu: false },
    { elementName: 'Elemento 2', content: 'Conteúdo 2', status: 'Inativo', isVisible: true, menu: false },
    { elementName: 'Elemento 3', content: 'Conteúdo 3', status: 'Ativo', isVisible: true, menu: false },
  ];

  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('tableData');
    return savedData ? JSON.parse(savedData) : initialData;
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('tableData', JSON.stringify(data));
  }, [data]);

  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedIndex(index);
    setData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index].menu = true;
      return updatedData;
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedIndex(null);
    setData((prevData) => {
      const updatedData = prevData.map((item) => ({ ...item, menu: false }));
      return updatedData;
    });
  };

  const handleOptionSelect = (index, action) => {
    if (selectedIndex !== null) {
      action(index, setData, handleClose);
    }
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>elementName</TableCell>
            <TableCell>content</TableCell>
            <TableCell>status</TableCell>
            <TableCell>Visibilidade</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.elementName}</TableCell>
              <TableCell>{row.content}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{options[0].icon(row.isVisible)}</TableCell>
              <TableCell>
                <IconButton onClick={(event) => handleClick(event, index)}>
                  <MoreVertIcon />
                </IconButton>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl && selectedIndex === index)} onClose={handleClose}>
                  {options.map((option) => (
                    <MenuItem key={option.id} onClick={() => handleOptionSelect(index, option.action)}>
                      {option.label(row.isVisible)}
                    </MenuItem>
                  ))}
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
