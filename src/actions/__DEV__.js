import storage from 'electron-json-storage';

import { loadProject } from './project';
import { toRouter } from './router';
import { cleanHistory } from './history';

export const devMockOperation = () => (
	(dispatch) => {
		console.log('[Mock] Mock pick project...');

		storage.get('project', (error, projectState) => {
			if (error) console.warn('[Mock] Project not ready...', error);

			dispatch(loadProject(projectState.historyPathList[0])).then(() => {
				dispatch(toRouter('/ability'));
				dispatch(cleanHistory());
			}, (err) => {
				console.error(err);
			});
		});
	}
);

export default {};
