import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { app } from '../../services/firebaseUtils'
import { collection, getFirestore, doc, setDoc } from "firebase/firestore";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Logo from '../../assets/logo.png'
import { isAuthenticated } from '../../services/auth';
const theme = createTheme();

export default function SignUp() {
  let [name, setName] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [role, setRole] = useState('');
  let [user, setUser] = useState();

  const db = getFirestore(app)
  const userCollectionRef = collection(db, "users")

  const chandleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const authentication = getAuth();

    if(!user.name){
      toast.error('Campo nome está vazio!')
    }else if(!user.email){
      toast.error('Campo email está vazio!')
    }else if(!data.get('password')){
      toast.error('Campo senha está vazio!')
    }else if(!role){
      toast.error('Campo nivel está vazio!')
    }else {
      createUserWithEmailAndPassword( authentication, data.get('email'), data.get('password'))
        .then((response) => {
            const uid = response.user.uid;
            setDoc(doc(userCollectionRef, uid), user);
            toast.success("Registro realizado com sucesso!")
            setName('')
            setEmail('')
            setPassword('')
            setRole('')
        }).catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
                toast.error('Email já está em uso!');
            }
        })
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: 400,
              height: 150,
              marginBottom: 2,
              paddingTop:3,
              border: 'solid 2px rgba(0, 0, 0, .1)',
              borderRadius: 5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img src={Logo} alt="Logo CarDealership" width="220"/>
         </Box>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Cadastrar Colaborador
          </Typography>
          <Box component="form" noValidate onSubmit={chandleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Nome Completo"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Endereço de e-mail"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
              <InputLabel id="demo-simple-select-label">Nivel</InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={role}
                  label="Nivel"
                  onChange={(e) => setRole(e.target.value)}
                  fullWidth
                >
                  <MenuItem value={'admin'}>Admin</MenuItem>
                  <MenuItem value={'salesperson'}>Vendedor</MenuItem>
                  <MenuItem value={'marketing'}>Marketing</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(e) => {
                setUser({
                id: Math.floor(Math.random() * 100),
                type: 'colaborador',
                name,
                email,
                role
              })
            
            }}
            >
              Cadastrar
            </Button>
          </Box>
        </Box>
        <ToastContainer />
      </Container>
    </ThemeProvider>
  );
}