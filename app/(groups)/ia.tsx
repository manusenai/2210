import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import styled from "styled-components/native";
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons'; 
import { Link as ExpoRouterLink } from 'expo-router';

const ArgumentScreen = () => {
  const [topic, setTopic] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSendTopic = async () => {
    if (!topic) {
      alert('Por favor, insira um tema.');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://192.168.1.56:3000/argumento', { tema: topic });
      setResponse(res.data);
    } catch (error) {
      setResponse('Erro ao gerar redação. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContainerBody>
      <View style={styles.container}>
        <Text style={styles.label}>Insira o tema da redação:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o tema aqui..."
          value={topic}
          onChangeText={setTopic}
        />
        <Button title="Gerar Redação" onPress={handleSendTopic} disabled={loading} />
        
        {loading ? <Text style={styles.loading}>Gerando redação...</Text> : null}

        <ScrollView style={styles.responseContainer}>
          <Text style={styles.responseText}>{response}</Text>
        </ScrollView>
      </View>

      <Footer>
        <ButtonContainer href='/newRedacao'>
          <Icone source={require('../../assets/mais.png')} /> 
        </ButtonContainer>

        <ButtonContainer href='/sinonimos'>
          <Icone source={require('../../assets/editor-de-texto.png')} /> 
        </ButtonContainer>
        <ButtonContainer href='/ia'>
          <Icone source={require('../../assets/editor-de-texto.png')} /> 
        </ButtonContainer>
      </Footer>
    </ContainerBody>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  loading: {
    fontSize: 16,
    marginVertical: 10,
    color: 'blue',
  },
  responseContainer: {
    marginTop: 20,
    maxHeight: 300,
  },
  responseText: {
    fontSize: 16,
    color: '#333',
  },
});

const ContainerBody = styled.View`
  flex: 1;
  background-color: #F5F5F5;
  align-items: center;
`;

const Footer = styled.View`
  width: 100%;
  position: absolute;
  bottom: 0;
  flex-direction: row;
  justify-content: space-around;
  background-color: #18206f;
  align-items: center;
  height: 90px;
`;

const ButtonContainer = styled(ExpoRouterLink)`
  height: 80px;
  width: 80px;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const Icone = styled.Image`
  width: 30px;  
  height: 30px;
`;

export default ArgumentScreen;
