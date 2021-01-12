import { useCallback } from 'react';

export default function (state, setState, name) {
  const onLoad = useCallback(({ data }) => {
    const { _id, filename, link } = data;

    // eslint-disable-next-line no-param-reassign
    state[name] = [
      ...state[name],
      {
        _id,
        filename,
        link
      }
    ];

    setState(state);
  }, [state]);

  const onDelete = useCallback((id) => {
    const attachments = [...state[name]];

    const matchId = attachments.findIndex(attachment => attachment._id === id);

    if (matchId !== -1) {
      attachments.splice(matchId, 1);

      setState({ [name]: attachments });
    }
  }, [state]);

  return {
    onLoad,
    onDelete
  };
}
