import { useState } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TextInput,
  View
} from 'react-native';

import Button from '../components/Button';
import TarefaItem from '../components/TarefaItem';
import Title from '../components/Title';

export default function Index() {
  interface Task {
    id: string;
    text: string;
    completed: boolean;
    createdAt: Date;
  }

  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputText, setInputText] = useState('');

  const addTask = () => {
    if (inputText.trim()) {
      // Cria um novo objeto de tarefa
      const newTask: Task = {
        id: Date.now().toString(), // Gera um ID único baseado no timestamp atual
        text: inputText.trim(),    // Remove espaços desnecessários
        completed: false,          // Inicializa como não concluída
        createdAt: new Date(),     // Marca a data/hora de criação
      };
      setTasks([...tasks, newTask]);
      setInputText('');
    }
  };

  const toggleTask = (id: string) => {
    // Percorre a lista de tarefas e altera o estado da tarefa com ID correspondente
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const exibirTask = ({ item }: { item: Task }) => (
    <TarefaItem
      id={item.id}
      text={item.text}
      completed={item.completed}
      onToggle={toggleTask} 
      deleteTask={deleteTask} // Passa a função de toggle como prop
    />
  );

  const deleteTask = (id: string) => {
    const novaLista = tasks.filter(task => task.id !== id)
    setTasks(novaLista);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title text="Tarefas" />

        <View style={styles.inputContainer}>
          <TextInput
            value={inputText}
            onChangeText={setInputText}  // Atualiza o estado conforme digita
            placeholder="Digite uma nova tarefa..."
            style={styles.input}
          />
          <Button
            title="Adicionar"
            onPress={addTask}
            disabled={!inputText.trim()}  // Desabilita se texto estiver vazio
          />
        </View>
      </View>

      <ScrollView style={styles.listContainer}>
        {tasks.length > 0 ? (
          <FlatList
            data={tasks}                   // Fonte de dados
            renderItem={exibirTask}         // Função de renderização
            keyExtractor={item => item.id}  // Extrai chaves únicas
            style={styles.list}
            showsVerticalScrollIndicator={false} // Oculta barra de scroll
          />
        ) : (
          <View style={styles.emptyState}>
            <Title text="Nenhuma tarefa ainda..." />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    paddingBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
  },
  input: {
    flex: 2,
    height: 48,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
    color: '#333',
  }
});