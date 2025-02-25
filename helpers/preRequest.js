export default function getEnvironmentVariablesFromScript(script) {
  const _variables = {}

  try {
    // the pw object is the proxy by which pre-request scripts can pass variables to the request.
    // for security and control purposes, this is the only way a pre-request script should modify variables.
    const pw = {
      environment: {
        set: (key, value) => (_variables[key] = value),
      },
      env: {
        set: (key, value) => (_variables[key] = value),
      },
      // globals that the script is allowed to have access to.
    }

    // run pre-request script within this function so that it has access to the pw object.
    // eslint-disable-next-line no-new-func
    new Function("pw", script)(pw)
  } catch (_e) {}

  return _variables
}
