--
-- PostgreSQL database dump
--

-- Dumped from database version 16.9
-- Dumped by pg_dump version 16.9

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
-- Name: members; Type: TABLE; Schema: public; Owner: cat_and_dog
--

CREATE TABLE public.members (
    member_id integer NOT NULL,
    user_id integer,
    email_show boolean DEFAULT false NOT NULL,
    name_show boolean DEFAULT false NOT NULL,
    mobile_show boolean DEFAULT false NOT NULL,
    confirmed boolean DEFAULT false NOT NULL,
    active_date timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.members OWNER TO cat_and_dog;

--
-- Name: members_invites; Type: TABLE; Schema: public; Owner: cat_and_dog
--

CREATE TABLE public.members_invites (
    member_id integer NOT NULL,
    node_id integer NOT NULL,
    member_name character varying(50) NOT NULL,
    token character varying(255) NOT NULL
);


ALTER TABLE public.members_invites OWNER TO cat_and_dog;

--
-- Name: members_to_members; Type: TABLE; Schema: public; Owner: cat_and_dog
--

CREATE TABLE public.members_to_members (
    branch_id integer NOT NULL,
    from_member_id integer NOT NULL,
    to_member_id integer NOT NULL,
    dislike boolean DEFAULT false NOT NULL,
    vote boolean DEFAULT false NOT NULL,
    replacing boolean DEFAULT false NOT NULL
);


ALTER TABLE public.members_to_members OWNER TO cat_and_dog;

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
-- Name: nets; Type: TABLE; Schema: public; Owner: cat_and_dog
--

CREATE TABLE public.nets (
    net_id integer NOT NULL,
    net_level integer DEFAULT 0 NOT NULL,
    parent_net_id integer,
    root_net_id integer,
    count_of_nets integer DEFAULT 1 NOT NULL
);


ALTER TABLE public.nets OWNER TO cat_and_dog;

--
-- Name: nets_data; Type: TABLE; Schema: public; Owner: cat_and_dog
--

CREATE TABLE public.nets_data (
    net_id integer NOT NULL,
    name character varying(50) NOT NULL,
    goal text DEFAULT NULL::character varying,
    resource_name character varying(50) DEFAULT NULL::character varying,
    net_link character varying(255) DEFAULT NULL::character varying
);


ALTER TABLE public.nets_data OWNER TO cat_and_dog;

--
-- Name: nets_guests; Type: TABLE; Schema: public; Owner: cat_and_dog
--

CREATE TABLE public.nets_guests (
    net_id integer NOT NULL,
    user_id integer NOT NULL,
    comment character varying(255) NOT NULL
);


ALTER TABLE public.nets_guests OWNER TO cat_and_dog;

--
-- Name: nets_net_id_seq; Type: SEQUENCE; Schema: public; Owner: cat_and_dog
--

ALTER TABLE public.nets ALTER COLUMN net_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.nets_net_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: nodes; Type: TABLE; Schema: public; Owner: cat_and_dog
--

CREATE TABLE public.nodes (
    node_id integer NOT NULL,
    node_level integer DEFAULT 0 NOT NULL,
    parent_node_id integer,
    net_id integer NOT NULL,
    node_position integer DEFAULT 0 NOT NULL,
    count_of_members integer DEFAULT 0 NOT NULL,
    updated timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.nodes OWNER TO cat_and_dog;

--
-- Name: nodes_node_id_seq; Type: SEQUENCE; Schema: public; Owner: cat_and_dog
--

ALTER TABLE public.nodes ALTER COLUMN node_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.nodes_node_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


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
-- Data for Name: members; Type: TABLE DATA; Schema: public; Owner: cat_and_dog
--

COPY public.members (member_id, user_id, email_show, name_show, mobile_show, confirmed, active_date) FROM stdin;
\.


--
-- Data for Name: members_invites; Type: TABLE DATA; Schema: public; Owner: cat_and_dog
--

COPY public.members_invites (member_id, node_id, member_name, token) FROM stdin;
\.


--
-- Data for Name: members_to_members; Type: TABLE DATA; Schema: public; Owner: cat_and_dog
--

COPY public.members_to_members (branch_id, from_member_id, to_member_id, dislike, vote, replacing) FROM stdin;
\.


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: cat_and_dog
--

COPY public.messages (subject, content, message_id, date) FROM stdin;
\.


--
-- Data for Name: nets; Type: TABLE DATA; Schema: public; Owner: cat_and_dog
--

COPY public.nets (net_id, net_level, parent_net_id, root_net_id, count_of_nets) FROM stdin;
\.


--
-- Data for Name: nets_data; Type: TABLE DATA; Schema: public; Owner: cat_and_dog
--

COPY public.nets_data (net_id, name, goal, resource_name, net_link) FROM stdin;
\.


--
-- Data for Name: nets_guests; Type: TABLE DATA; Schema: public; Owner: cat_and_dog
--

COPY public.nets_guests (net_id, user_id, comment) FROM stdin;
\.


--
-- Data for Name: nodes; Type: TABLE DATA; Schema: public; Owner: cat_and_dog
--

COPY public.nodes (node_id, node_level, parent_node_id, net_id, node_position, count_of_members, updated) FROM stdin;
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
-- Name: nets_net_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cat_and_dog
--

SELECT pg_catalog.setval('public.nets_net_id_seq', 1, false);


--
-- Name: nodes_node_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cat_and_dog
--

SELECT pg_catalog.setval('public.nodes_node_id_seq', 1, false);


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
-- Name: members pk_members; Type: CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.members
    ADD CONSTRAINT pk_members PRIMARY KEY (member_id);


--
-- Name: members_invites pk_members_invites; Type: CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.members_invites
    ADD CONSTRAINT pk_members_invites PRIMARY KEY (node_id);


--
-- Name: members_to_members pk_members_to_members; Type: CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.members_to_members
    ADD CONSTRAINT pk_members_to_members PRIMARY KEY (from_member_id, to_member_id, replacing);


--
-- Name: messages pk_messages; Type: CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT pk_messages PRIMARY KEY (message_id);


--
-- Name: nets pk_nets; Type: CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.nets
    ADD CONSTRAINT pk_nets PRIMARY KEY (net_id);


--
-- Name: nets_data pk_nets_data; Type: CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.nets_data
    ADD CONSTRAINT pk_nets_data PRIMARY KEY (net_id);


--
-- Name: nets_guests pk_nets_guests; Type: CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.nets_guests
    ADD CONSTRAINT pk_nets_guests PRIMARY KEY (net_id, user_id);


--
-- Name: nodes pk_nodes; Type: CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.nodes
    ADD CONSTRAINT pk_nodes PRIMARY KEY (node_id);


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
-- Name: members_invites uk_members_invites_token; Type: CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.members_invites
    ADD CONSTRAINT uk_members_invites_token UNIQUE (token);


--
-- Name: users_tokens uk_users_tokens_token; Type: CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.users_tokens
    ADD CONSTRAINT uk_users_tokens_token UNIQUE (token);


--
-- Name: members_invites_token_idx; Type: INDEX; Schema: public; Owner: cat_and_dog
--

CREATE UNIQUE INDEX members_invites_token_idx ON public.members_invites USING btree (token);


--
-- Name: sk_members_to_members_branch; Type: INDEX; Schema: public; Owner: cat_and_dog
--

CREATE INDEX sk_members_to_members_branch ON public.members_to_members USING btree (branch_id);


--
-- Name: sk_members_user; Type: INDEX; Schema: public; Owner: cat_and_dog
--

CREATE INDEX sk_members_user ON public.members USING btree (user_id);


--
-- Name: sk_nets_guests_net; Type: INDEX; Schema: public; Owner: cat_and_dog
--

CREATE INDEX sk_nets_guests_net ON public.nets_guests USING btree (net_id);


--
-- Name: sk_nets_guests_user; Type: INDEX; Schema: public; Owner: cat_and_dog
--

CREATE INDEX sk_nets_guests_user ON public.nets_guests USING btree (user_id);


--
-- Name: sk_nodes_parent_node; Type: INDEX; Schema: public; Owner: cat_and_dog
--

CREATE INDEX sk_nodes_parent_node ON public.nodes USING btree (parent_node_id NULLS FIRST);


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
-- Name: members_invites fk_members_invites_member; Type: FK CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.members_invites
    ADD CONSTRAINT fk_members_invites_member FOREIGN KEY (member_id) REFERENCES public.members(member_id) ON DELETE CASCADE;


--
-- Name: members_invites fk_members_invites_node; Type: FK CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.members_invites
    ADD CONSTRAINT fk_members_invites_node FOREIGN KEY (node_id) REFERENCES public.nodes(node_id);


--
-- Name: members fk_members_node; Type: FK CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.members
    ADD CONSTRAINT fk_members_node FOREIGN KEY (member_id) REFERENCES public.nodes(node_id);


--
-- Name: members_to_members fk_members_to_members_from_member; Type: FK CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.members_to_members
    ADD CONSTRAINT fk_members_to_members_from_member FOREIGN KEY (from_member_id) REFERENCES public.members(member_id) ON DELETE CASCADE;


--
-- Name: members_to_members fk_members_to_members_to_member; Type: FK CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.members_to_members
    ADD CONSTRAINT fk_members_to_members_to_member FOREIGN KEY (to_member_id) REFERENCES public.members(member_id) ON DELETE CASCADE;


--
-- Name: members fk_members_user; Type: FK CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.members
    ADD CONSTRAINT fk_members_user FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: nets_data fk_nets_data_net; Type: FK CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.nets_data
    ADD CONSTRAINT fk_nets_data_net FOREIGN KEY (net_id) REFERENCES public.nets(net_id) ON DELETE CASCADE;


--
-- Name: nets_guests fk_nets_guests_net; Type: FK CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.nets_guests
    ADD CONSTRAINT fk_nets_guests_net FOREIGN KEY (net_id) REFERENCES public.nets(net_id) ON DELETE CASCADE;


--
-- Name: nets_guests fk_nets_guests_user; Type: FK CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.nets_guests
    ADD CONSTRAINT fk_nets_guests_user FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: nodes fk_nodes_net; Type: FK CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.nodes
    ADD CONSTRAINT fk_nodes_net FOREIGN KEY (net_id) REFERENCES public.nets(net_id);


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

