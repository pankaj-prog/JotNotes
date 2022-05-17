import React, { useState } from "react";
import axios from "axios";

export const useAxios = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const makeRequest = async (params) => {
    try {
      setLoading(true);
      const res = await axios.request(params);
      setResponse(res.data);
      return res.data;
    } catch (error) {
      setError(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { response, error, loading, makeRequest };
};
