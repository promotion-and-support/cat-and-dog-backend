import { IOperationData, TTestUnit } from '../../types/types';

export const user =
  (id: number): TTestUnit =>
  (state: any) => ({
    title: `login user ${id}`,
    operations: [
      {
        name: '/health',
        params: {},
        expected: 'API IS READY',
        setToState: () =>
          Object.keys(state).forEach(
            (key) => key !== 'global' && delete state[key],
          ),
      },
      {
        name: '/account/login',
        params: {
          email: `user${String(id).padStart(2, '0')}@gmail.com`,
          password: '12345',
        },
        expected: () => ({
          email: `user${String(id).padStart(2, '0')}@gmail.com`,
          mobile: null,
          name: `Учасник ${id}`,
          user_id: id,
          user_status: 'LOGGEDIN',
          chat_id: state.user.chat_id,
        }),
        setToState: (actual) => (state.user = actual),
      },
      {
        name: '/chat/connect/user',
        params: {},
      },
      {
        name: '/chat/connect/nets',
        params: {},
        setToState: (actual) => {
          state.chats || (state.chats = {});
          actual.forEach((net: any) => (state.chats[net.net_id] = net));
        },
      },
    ] as IOperationData[],
  });
