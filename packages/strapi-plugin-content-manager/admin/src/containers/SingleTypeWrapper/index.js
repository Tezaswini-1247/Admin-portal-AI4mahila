import { memo, useCallback, useEffect, useRef, useReducer } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { get } from 'lodash';
import { request, useGlobalContext } from 'strapi-helper-plugin';
import PropTypes from 'prop-types';
import { createDefaultForm, getTrad, removePasswordFieldsFromData } from '../../utils';
import { getRequestUrl } from './utils';
import reducer, { initialState } from './reducer';

// This container is used to handle the data fetching management part
const SingleTypeWrapper = ({ allLayoutData, children, slug }) => {
  const { emitEvent } = useGlobalContext();
  const { push } = useHistory();
  const { state } = useLocation();
  const emitEventRef = useRef(emitEvent);

  // Here in case of a 403 response when fetching data we will either redirect to the previous page
  // Or to the homepage if there's no state in the history stack
  const from = get(state, 'from', '/');

  const [
    { componentsDataStructure, contentTypeDataStructure, data, isCreatingEntry, isLoading, status },
    dispatch,
  ] = useReducer(reducer, initialState);

  const id = get(data, 'id', '');

  const cleanReceivedDataFromPasswords = useCallback(
    data => {
      return removePasswordFieldsFromData(
        data,
        allLayoutData.contentType,
        allLayoutData.components
      );
    },
    [allLayoutData.components, allLayoutData.contentType]
  );

  // SET THE DEFAULT LAYOUT the effect is applied when the slug changes
  useEffect(() => {
    const componentsDataStructure = Object.keys(allLayoutData.components).reduce((acc, current) => {
      acc[current] = createDefaultForm(
        get(allLayoutData, ['components', current, 'schema', 'attributes'], {}),
        allLayoutData.components
      );

      return acc;
    }, {});

    const contentTypeDataStructure = createDefaultForm(
      allLayoutData.contentType.schema.attributes,
      allLayoutData.components
    );

    dispatch({
      type: 'SET_DATA_STRUCTURES',
      componentsDataStructure,
      contentTypeDataStructure,
    });
  }, [allLayoutData]);

  // Check if creation mode or editing mode
  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const fetchData = async signal => {
      dispatch({ type: 'GET_DATA' });

      try {
        const data = await request(getRequestUrl(slug), { method: 'GET', signal });

        dispatch({
          type: 'GET_DATA_SUCCEEDED',
          data: cleanReceivedDataFromPasswords(data),
        });
      } catch (err) {
        const responseStatus = get(err, 'response.status', null);

        // Creating an st
        if (responseStatus === 404) {
          dispatch({ type: 'INIT_FORM' });
          // setIsCreatingEntry(true);
        }

        if (responseStatus === 403) {
          strapi.notification.info(getTrad('permissions.not-allowed.update'));

          push(from);
        }
      }
    };

    fetchData(signal);

    return () => abortController.abort();
  }, [cleanReceivedDataFromPasswords, from, push, slug]);

  const displayErrors = useCallback(err => {
    const errorPayload = err.response.payload;
    console.error(errorPayload);

    let errorMessage = get(errorPayload, ['message'], 'Bad Request');

    // TODO handle errors correctly when back-end ready
    if (Array.isArray(errorMessage)) {
      errorMessage = get(errorMessage, ['0', 'messages', '0', 'id']);
    }

    if (typeof errorMessage === 'string') {
      strapi.notification.error(errorMessage);
    }
  }, []);

  const onPost = useCallback(
    async (formData, trackerProperty) => {
      const endPoint = getRequestUrl(slug);

      try {
        dispatch({ type: 'SET_STATUS', status: 'submit-pending' });

        const response = await request(
          endPoint,
          { method: 'POST', headers: {}, body: formData },
          false,
          false
        );

        emitEventRef.current('didCreateEntry', trackerProperty);
        strapi.notification.success(getTrad('success.record.save'));

        dispatch({ type: 'SUBMIT_SUCCEEDED', data: cleanReceivedDataFromPasswords(response) });
        dispatch({ type: 'SET_STATUS', status: 'resolved' });
      } catch (err) {
        displayErrors(err);

        emitEventRef.current('didNotCreateEntry', { error: err, trackerProperty });

        dispatch({ type: 'SET_STATUS', status: 'resolved' });
      }
    },
    [cleanReceivedDataFromPasswords, displayErrors, slug]
  );
  const onPublish = useCallback(async () => {
    try {
      emitEventRef.current('willPublishEntry');
      const endPoint = getRequestUrl(`${slug}/publish/${id}`);

      dispatch({ type: 'SET_STATUS', status: 'publish-pending' });

      const data = await request(endPoint, { method: 'POST' });

      emitEventRef.current('didPublishEntry');

      dispatch({ type: 'SUBMIT_SUCCEEDED', data: cleanReceivedDataFromPasswords(data) });

      dispatch({ type: 'SET_STATUS', status: 'resolved' });

      strapi.notification.success(getTrad('success.record.publish'));
    } catch (err) {
      displayErrors(err);
      dispatch({ type: 'SET_STATUS', status: 'resolved' });
    }
  }, [cleanReceivedDataFromPasswords, displayErrors, id, slug]);

  const onPut = useCallback(
    async (formData, trackerProperty) => {
      const endPoint = getRequestUrl(`${slug}/${id}`);

      try {
        // Show a loading button in the EditView/Header.js && lock the app => no navigation
        dispatch({ type: 'SET_STATUS', status: 'submit-pending' });
        emitEventRef.current('willEditEntry', trackerProperty);

        const response = await request(
          endPoint,
          { method: 'PUT', headers: {}, body: formData },
          false,
          false
        );

        emitEventRef.current('didEditEntry', { trackerProperty });

        dispatch({ type: 'SUBMIT_SUCCEEDED', data: cleanReceivedDataFromPasswords(response) });
        // Enable navigation and remove loaders
        dispatch({ type: 'SET_STATUS', status: 'resolved' });
      } catch (err) {
        displayErrors(err);

        emitEventRef.current('didNotEditEntry', { error: err, trackerProperty });
        // Enable navigation and remove loaders
        dispatch({ type: 'SET_STATUS', status: 'resolved' });
      }
    },
    [cleanReceivedDataFromPasswords, id, displayErrors, slug]
  );

  // The publish and unpublish method could be refactored but let's leave the duplication for now
  const onUnpublish = useCallback(async () => {
    const endPoint = getRequestUrl(`${slug}/unpublish/${id}`);
    dispatch({ type: 'SET_STATUS', status: 'unpublish-pending' });

    try {
      emitEventRef.current('willUnpublishEntry');

      const response = await request(endPoint, { method: 'POST' });

      emitEventRef.current('didUnpublishEntry');
      dispatch({ type: 'SUBMIT_SUCCEEDED', data: cleanReceivedDataFromPasswords(response) });

      dispatch({ type: 'SET_STATUS', status: 'resolved' });

      strapi.notification.success(getTrad('success.record.unpublish'));
    } catch (err) {
      dispatch({ type: 'SET_STATUS', status: 'resolved' });
      displayErrors(err);
    }
  }, [cleanReceivedDataFromPasswords, displayErrors, id, slug]);

  return children({
    componentsDataStructure,
    contentTypeDataStructure,
    data,
    isCreatingEntry,
    isLoadingForData: isLoading,
    onPost,
    onPublish,
    onPut,
    onUnpublish,
    status,
  });
};

SingleTypeWrapper.propTypes = {
  allLayoutData: PropTypes.shape({
    components: PropTypes.object.isRequired,
    contentType: PropTypes.object.isRequired,
  }).isRequired,
  children: PropTypes.func.isRequired,
  slug: PropTypes.string.isRequired,
};

export default memo(SingleTypeWrapper);
