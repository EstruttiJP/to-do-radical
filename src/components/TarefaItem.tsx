import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Checkbox from './Checkbox';
import Label from './Label';

interface TarefaItemProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  deleteTask: (id: string) => void;
}

export default function TarefaItem({ id, text, completed, onToggle, deleteTask }: TarefaItemProps) {
  return (
    <View style={styles.container}>
      <Checkbox checked={completed} onPress={() => onToggle(id)} />
      <Label text={text} completed={completed} />
      <TouchableOpacity
        onPress={() => deleteTask(id)}>
        <Text>X</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
});