export enum RoutePolicies {
  // Messages
  findAllMessages = 'findAllMessages',
  findOneMessage = 'findOneMessage',
  createMessage = 'createMessage',
  updateMessage = 'updateMessage',
  deleteMessage = 'deleteMessage',

  // Users
  findAllUsers = 'findAllUsers',
  findOneUser = 'findOneUser',
  createUser = 'createUser',
  updateUser = 'updateUser',
  deleteUser = 'deleteUser',
}

// Permissões padrão para usuários comuns
export const USER_POLICIES: RoutePolicies[] = [
  RoutePolicies.findAllMessages,
  RoutePolicies.findOneMessage,
  RoutePolicies.createMessage,
  RoutePolicies.updateMessage,
  RoutePolicies.deleteMessage,
  RoutePolicies.findAllUsers,
  RoutePolicies.findOneUser,
];

// Permissões para administradores (todas as policies)
export const ADMIN_POLICIES: RoutePolicies[] = [
  RoutePolicies.findAllMessages,
  RoutePolicies.findOneMessage,
  RoutePolicies.createMessage,
  RoutePolicies.updateMessage,
  RoutePolicies.deleteMessage,
  RoutePolicies.findAllUsers,
  RoutePolicies.findOneUser,
  RoutePolicies.createUser,
  RoutePolicies.updateUser,
  RoutePolicies.deleteUser,
];
