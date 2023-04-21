import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
//import { useDispatch } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  //const user = useSelector(state => state.userInfo);


  const handleLogin = () => {
    // handle login logic
    const userInfo = {
      email,
      password,
    };
    dispatch({ type: 'LOGIN', payload: userInfo });
    navigation.navigate('User');
   
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={()=>navigation.navigate('Register')}>
        <Text style={styles.linkText}>Don't have an account? Register here</Text>
      </TouchableOpacity>
    </View>
  );
}

const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.userInfo);

  const handleRegister = () => {
    // handle registration logic
    const userInfo = {
      email,
      password,
      username,
    };
    dispatch({ type: 'REGISTER', payload: userInfo });
    navigation.navigate('User');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        value={username} 
        onChangeText={setUsername} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
      />

      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Confirm Password" 
        value={confirmPassword} 
        onChangeText={setConfirmPassword} 
        secureTextEntry 
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={()=>navigation.navigate('Login')}>
        <Text style={styles.linkText}>Already have an account? Login here</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
    color:"#f6437b"
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    padding: 8,
    marginVertical: 8,
    width: '80%',
  },
  button: {
    backgroundColor: '#f6437b',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  link: {
    marginTop: 32,
  },
  linkText: {
    color: '#000',
    textDecorationLine: 'underline',
  },
});

export { LoginScreen, RegisterScreen };
