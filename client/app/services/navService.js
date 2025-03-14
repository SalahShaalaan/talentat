
const BASE_URL = 'http://localhost:8081';

const api = {
  get: async (endpoint) => {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    return response.ok ? response.json() : Promise.reject(response.statusText);
  },

  post: async (endpoint, data) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.ok;
  }
};

export const fetchMenuItems = async () => {
  const items = await api.get('/api/navs');
  return items.map(item => ({
    ...item,
    expanded: false,
    visible: item.visible !== false,
    children: item.children?.map(child => ({
      ...child,
      visible: child.visible !== false
    }))
  }));
};

export const trackItemMove = async ({ id, from, to }) => {
  const moveData = {
    id,
    from,
    to,
  };

  try {
    const tracked = await api.post('/api/navs/track', moveData);
    if (!tracked) {
      console.warn('Failed to track item movement');
    }
  } catch (error) {
    console.error('Error tracking move:', error);
  }
};

export const trackTitleChange = async ({ id, from, to }) => {
  try {
    await api.post('/api/navs/track', { id, from, to });
  } catch (error) {
    console.error('Error tracking title change:', error);
  }
};

export const saveNavigation = async (items) => {
  const cleanItems = items.map(({ expanded, ...item }) => ({
    ...item,
    children: item.children?.map(({ expanded, ...child }) => child)
  }));

  try {
    const response = await api.post('/api/navs', cleanItems);
    if (!response) {
      throw new Error('Failed to save navigation');
    }
    return true;
  } catch (error) {
    console.error('Error saving navigation:', error);
    throw new Error('Failed to save navigation changes');
  }
};
