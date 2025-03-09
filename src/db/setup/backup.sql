--
-- PostgreSQL database dump
--

-- Dumped from database version 16.8
-- Dumped by pg_dump version 16.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: messages; Type: TABLE; Schema: public; Owner: cat_and_dog
--

CREATE TABLE public.messages (
    subject character varying NOT NULL,
    content character varying NOT NULL,
    message_id integer NOT NULL,
    date timestamp with time zone NOT NULL
);


ALTER TABLE public.messages OWNER TO cat_and_dog;

--
-- Name: roles; Type: TABLE; Schema: public; Owner: cat_and_dog
--

CREATE TABLE public.roles (
    role_id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.roles OWNER TO cat_and_dog;

--
-- Name: roles_role_id_seq; Type: SEQUENCE; Schema: public; Owner: cat_and_dog
--

ALTER TABLE public.roles ALTER COLUMN role_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.roles_role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: cat_and_dog
--

CREATE TABLE public.sessions (
    session_id integer NOT NULL,
    user_id integer NOT NULL,
    session_key character varying(255) NOT NULL,
    session_value character varying(255) NOT NULL,
    updated timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.sessions OWNER TO cat_and_dog;

--
-- Name: sessions_session_id_seq; Type: SEQUENCE; Schema: public; Owner: cat_and_dog
--

ALTER TABLE public.sessions ALTER COLUMN session_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.sessions_session_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: subscriptions; Type: TABLE; Schema: public; Owner: cat_and_dog
--

CREATE TABLE public.subscriptions (
    user_id integer NOT NULL,
    type character varying NOT NULL,
    sent_date timestamp with time zone DEFAULT now() NOT NULL,
    subject character varying NOT NULL,
    message_date timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.subscriptions OWNER TO cat_and_dog;

--
-- Name: users; Type: TABLE; Schema: public; Owner: cat_and_dog
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    email character varying(50) DEFAULT NULL::character varying,
    name character varying(50) DEFAULT NULL::character varying,
    mobile character varying(50) DEFAULT NULL::character varying,
    password character varying(255) DEFAULT NULL::character varying,
    confirmed boolean DEFAULT false NOT NULL,
    chat_id character varying(50) DEFAULT NULL::character varying
);


ALTER TABLE public.users OWNER TO cat_and_dog;

--
-- Name: users_roles; Type: TABLE; Schema: public; Owner: cat_and_dog
--

CREATE TABLE public.users_roles (
    user_id integer NOT NULL,
    role_id integer NOT NULL
);


ALTER TABLE public.users_roles OWNER TO cat_and_dog;

--
-- Name: users_tokens; Type: TABLE; Schema: public; Owner: cat_and_dog
--

CREATE TABLE public.users_tokens (
    user_id integer NOT NULL,
    token character varying(255) NOT NULL
);


ALTER TABLE public.users_tokens OWNER TO cat_and_dog;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: cat_and_dog
--

ALTER TABLE public.users ALTER COLUMN user_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: cat_and_dog
--

COPY public.messages (subject, content, message_id, date) FROM stdin;
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: cat_and_dog
--

COPY public.roles (role_id, name) FROM stdin;
1	ADMIN
2	OWNER
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: cat_and_dog
--

COPY public.sessions (session_id, user_id, session_key, session_value, updated) FROM stdin;
\.


--
-- Data for Name: subscriptions; Type: TABLE DATA; Schema: public; Owner: cat_and_dog
--

COPY public.subscriptions (user_id, type, sent_date, subject, message_date) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: cat_and_dog
--

COPY public.users (user_id, email, name, mobile, password, confirmed, chat_id) FROM stdin;
\.


--
-- Data for Name: users_roles; Type: TABLE DATA; Schema: public; Owner: cat_and_dog
--

COPY public.users_roles (user_id, role_id) FROM stdin;
\.


--
-- Data for Name: users_tokens; Type: TABLE DATA; Schema: public; Owner: cat_and_dog
--

COPY public.users_tokens (user_id, token) FROM stdin;
\.


--
-- Name: roles_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cat_and_dog
--

SELECT pg_catalog.setval('public.roles_role_id_seq', 2, true);


--
-- Name: sessions_session_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cat_and_dog
--

SELECT pg_catalog.setval('public.sessions_session_id_seq', 1, false);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cat_and_dog
--

SELECT pg_catalog.setval('public.users_user_id_seq', 1, false);


--
-- Name: messages pk_messages; Type: CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT pk_messages PRIMARY KEY (message_id);


--
-- Name: roles pk_roles; Type: CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT pk_roles PRIMARY KEY (role_id);


--
-- Name: sessions pk_sessions; Type: CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT pk_sessions PRIMARY KEY (session_id);


--
-- Name: subscriptions pk_subscriptions; Type: CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT pk_subscriptions PRIMARY KEY (user_id, subject);


--
-- Name: users pk_users; Type: CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT pk_users PRIMARY KEY (user_id);


--
-- Name: users_roles pk_users_roles; Type: CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.users_roles
    ADD CONSTRAINT pk_users_roles PRIMARY KEY (user_id, role_id);


--
-- Name: users_tokens pk_users_tokens; Type: CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.users_tokens
    ADD CONSTRAINT pk_users_tokens PRIMARY KEY (user_id);


--
-- Name: users uk_chat_id; Type: CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT uk_chat_id UNIQUE (chat_id);


--
-- Name: users uk_email; Type: CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT uk_email UNIQUE (email);


--
-- Name: users_tokens uk_users_tokens_token; Type: CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.users_tokens
    ADD CONSTRAINT uk_users_tokens_token UNIQUE (token);


--
-- Name: users_chat_idx; Type: INDEX; Schema: public; Owner: cat_and_dog
--

CREATE UNIQUE INDEX users_chat_idx ON public.users USING btree (chat_id);


--
-- Name: users_email_idx; Type: INDEX; Schema: public; Owner: cat_and_dog
--

CREATE UNIQUE INDEX users_email_idx ON public.users USING btree (email);


--
-- Name: users_tokens_token_idx; Type: INDEX; Schema: public; Owner: cat_and_dog
--

CREATE UNIQUE INDEX users_tokens_token_idx ON public.users_tokens USING btree (token);


--
-- Name: sessions fk_sessions_user; Type: FK CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT fk_sessions_user FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: subscriptions fk_subscribtions_users; Type: FK CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT fk_subscribtions_users FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: users_roles fk_users_roles_role; Type: FK CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.users_roles
    ADD CONSTRAINT fk_users_roles_role FOREIGN KEY (role_id) REFERENCES public.roles(role_id) ON DELETE CASCADE;


--
-- Name: users_roles fk_users_roles_user; Type: FK CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.users_roles
    ADD CONSTRAINT fk_users_roles_user FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: users_tokens fk_users_tokens_user; Type: FK CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.users_tokens
    ADD CONSTRAINT fk_users_tokens_user FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

