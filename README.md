# SounaConsole

O **SounaConsole** é uma biblioteca TypeScript para aprimorar a experiência de logging no console, oferecendo funcionalidades adicionais, como colorização, exibição de timestamp e mensagens de carregamento interativas.

## Recursos Principais

- **Log Colorido:** Realce suas mensagens no console com cores vibrantes.
- **Timestamp Automático:** Adicione timestamps às mensagens para rastrear eventos com precisão.
- **Exibição de Carregamento:** Crie mensagens de carregamento interativas para feedback visual durante operações demoradas.
- **Tipos Adicionais:** Mensagens de sucesso, erro, aviso e informação, com opção de exibição de timestamp.

## Como Usar

1. Instale a biblioteca em seu projeto:

```bash
npm install souna-console
```

2. Importe e utilize no seu código:

```typescript
import { SounaConsole } from 'souna-console';

// Exemplos
SounaConsole.log('Hello, Souna!');  // Log padrão com timestamp
SounaConsole.success('Operação concluída com sucesso!');  // Mensagem de sucesso
SounaConsole.error('Erro inesperado.');  // Mensagem de erro
SounaConsole.loading('Carregando...', 5);  // Mensagem de carregamento por 5 segundos
```

## Contribuições

Contribuições são bem-vindas! Se você encontrar bugs, tiver sugestões ou quiser contribuir com código, sinta-se à vontade para abrir uma issue ou enviar um pull request.
